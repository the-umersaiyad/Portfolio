"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ThemeSync({ publicTheme }: { publicTheme: string }) {
  const pathname = usePathname();

  useEffect(() => {
    const isAdmin = pathname?.startsWith("/admin");
    const theme = isAdmin ? "dark" : publicTheme;

    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [pathname, publicTheme]);

  return null;
}
