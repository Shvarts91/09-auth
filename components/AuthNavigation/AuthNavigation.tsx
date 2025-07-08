"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/userStore";
import css from "./AuthNavigation.module.css";

const AuthNavigation = () => {
  const router = useRouter();
  // Отримуємо поточну сесію та юзера
  const { isAuthenticated, user } = useAuthStore();
  // Отримуємо метод очищення глобального стану
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    // Викликаємо logout
    await logout();
    // Чистимо глобальний стан
    clearIsAuthenticated();
    // Виконуємо навігацію на сторінку авторизації
    router.push("/sign-in");
  };

  // Якщо є сесія - відображаємо кнопку Logout та інформацію про користувача
  // інакше - лінки для авторизації
  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link prefetch={false} className={css.navigationLink} href="/sign-in">
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link prefetch={false} className={css.navigationLink} href="/sign-up">
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;
