"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Settings, 
  User, 
  Briefcase, 
  Clock, 
  Code2, 
  Share2, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AdminSidebar({ logoutAction }: { logoutAction: () => void }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Super Config", href: "/admin", icon: Settings },
    { name: "Profile", href: "/admin/profile", icon: User },
    { name: "Projects", href: "/admin/projects", icon: Briefcase },
    { name: "Journey", href: "/admin/journey", icon: Clock },
    { name: "Skills", href: "/admin/skills", icon: Code2 },
    { name: "Socials", href: "/admin/socials", icon: Share2 },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4 z-40">
        <span className="font-display font-bold text-lg tracking-tight">Admin<span className="text-accent">Panel</span></span>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 -mr-2 text-text-secondary hover:text-accent transition-colors">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed top-0 bottom-0 left-0 w-64 bg-surface border-r border-border flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 md:h-20 flex items-center justify-between px-6 border-b border-border">
          <span className="font-display font-bold text-xl tracking-tight hidden md:block">Admin<span className="text-accent">Panel</span></span>
          <span className="font-display font-bold text-xl tracking-tight md:hidden">Menu</span>
          <button onClick={() => setIsOpen(false)} className="md:hidden p-1 text-text-secondary hover:text-accent">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto hide-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-accent/10 text-accent" 
                    : "text-text-secondary hover:text-accent hover:bg-accent-subtle"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <form action={logoutAction}>
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-all">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
