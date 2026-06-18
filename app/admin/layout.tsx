import Link from "next/link";
import { logout } from "@/app/login/actions";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col md:flex-row text-text font-sans">
      <AdminSidebar logoutAction={logout} />

      {/* Main Content */}
      <main className="flex-1 md:ml-64 h-screen overflow-y-auto flex flex-col w-full">
        <div className="flex-1 p-4 md:p-8 pt-24 md:pt-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
