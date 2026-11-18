import LoginClient from "./LoginClient";

export const metadata = { title: "Admin Login — Chêne Gear" };

export default function AdminLoginPage({ searchParams }) {
  return <LoginClient from={searchParams?.from ?? "/admin"} />;
}
