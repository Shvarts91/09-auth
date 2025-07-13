"use client";
import { updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useMutation } from "@tanstack/react-query";

import css from "./EditProfilePage.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EditProfilePage = () => {
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateMe,
  });

  const handleSaveUser = async (formData: FormData) => {
    const username = formData.get("username") as string;

    try {
      const data = await mutateAsync({ username });
      if (data) {
        setUser(data);
        router.push("/profile");
      }
    } catch (error) {
      console.error("Oops, some error:", error);
    }
  };

  if (!user?.avatar || !user) {
    return <div>Loading...</div>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user.avatar}
          alt={user.username ?? ""}
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} action={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              defaultValue={user?.username}
              className={css.input}
              name="username"
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push("/profile")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
