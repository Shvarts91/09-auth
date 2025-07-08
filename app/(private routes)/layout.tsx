import { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <div className="auth-layout">{children}</div>;
}
