"use client";

import css from "./SignUpPage.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginRequest, register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const email = formData.get("email")?.toString() || "";
      const password = formData.get("password")?.toString() || "";

      const values: LoginRequest = { email, password };

      const response = await register(values);
      if (response) {
        setUser(response);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignUpPage;
