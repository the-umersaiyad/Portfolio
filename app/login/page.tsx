"use client";

import { useState } from "react";
import { login } from "./actions";
import { Lock, Mail, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const res = await login(formData);
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-bg relative overflow-y-auto px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-surface/80 backdrop-blur-xl border border-border p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-accent-subtle rounded-xl flex items-center justify-center mx-auto mb-4 border border-accent/20">
            <Lock className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-2xl font-display font-bold text-text mb-2">Admin Portal</h1>
          <p className="text-sm text-text-secondary">Sign in to manage your portfolio content.</p>
        </div>

        <form 
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit(new FormData(e.currentTarget));
          }} 
          className="space-y-5"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-bg border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-text placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-secondary ml-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full bg-bg border border-border rounded-xl pl-11 pr-4 py-3 text-sm text-text placeholder-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white py-3 rounded-xl font-medium shadow-lg shadow-accent/20 hover:bg-accent-hover hover:shadow-accent/40 transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70"
          >
            {loading ? "Authenticating..." : "Sign In"}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
