"use client";

import { useId } from "react";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateNoteType } from "@/types/note";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api/clientApi";

const OrderSchema = Yup.object().shape({
  title: Yup.string()
    .required("This field is required!")
    .min(3, "Too short")
    .max(50, "Too long"),
  content: Yup.string().max(500, "Too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("This field is required!"),
});

const NoteForm = () => {
  const router = useRouter();
  const onClose = () => router.push("/notes/filter/all");
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const fieldId = useId();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["noteList"] });
      router.push("/notes/filter/all");
    },
    onError: (error) => {
      console.error("Error creating note:", error);
    },
  });

  const handleSubmit = async (formData: FormData) => {
    const values: CreateNoteType = {
      title: formData.get("title") as CreateNoteType["title"],
      content: (formData.get("content") ?? "") as CreateNoteType["content"],
      tag: formData.get("tag") as CreateNoteType["tag"],
    };

    try {
      await OrderSchema.validate(values, { abortEarly: false });
      await mutation.mutateAsync(values);
      onClose();
    } catch (err) {
      console.error("Validation error:", err);
    }
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          required
          minLength={3}
          maxLength={50}
          id={`${fieldId}-title`}
          name="title"
          className={css.input}
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          className={css.textarea}
          maxLength={500}
          defaultValue={draft?.content}
          onChange={handleChange}
        />
      </fieldset>
      <fieldset className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          required
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft?.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </fieldset>
      <fieldset className={css.actions}>
        <button onClick={onClose} type="button" className={css.cancelButton}>
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </fieldset>
    </form>
  );
};
export default NoteForm;
