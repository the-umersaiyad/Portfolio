"use client";

import { useFormStatus } from "react-dom";
import { Save, Loader2 } from "lucide-react";

interface SubmitButtonProps {
  label?: string;
  icon?: React.ReactNode;
}

export function SubmitButton({ label = "Save Changes", icon }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending} 
      className="bg-accent text-white px-8 py-3 rounded-full shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all text-sm font-medium flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        icon || <Save className="w-4 h-4" />
      )}
      {pending ? "Saving..." : label}
    </button>
  );
}
