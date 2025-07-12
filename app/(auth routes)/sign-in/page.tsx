"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, LoginRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./SignInPage.module.css";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const email = formData.get("email")?.toString() || "";
      const password = formData.get("password")?.toString() || "";

      const values: LoginRequest = { email, password };

      const res = await login(values);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.log("error", error);
      setError("Invalid email or password");
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            className={css.input}
            id="email"
            type="email"
            name="email"
            required
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            className={css.input}
            id="password"
            type="password"
            name="password"
            required
          />
        </div>
        <div className={css.actions}>
          <button className={css.submitButton} type="submit">
            Log in
          </button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
};

export default SignIn;
