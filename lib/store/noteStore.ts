import { create } from "zustand";
import { CreateNoteType } from "@/types/note";
import { persist } from "zustand/middleware";

type NoteDraftStore = {
  draft: CreateNoteType;
  setDraft: (note: CreateNoteType) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNoteType = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft",

      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
