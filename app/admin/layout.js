import AdminShell from "./AdminShell";

export const metadata = { title: "Admin — Chêne Gear" };

export default function AdminLayout({ children }) {
  // Admin pages get their own shell — no site header/footer
  return <AdminShell>{children}</AdminShell>;
}
