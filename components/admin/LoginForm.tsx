"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, next }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Falha ao entrar");
        return;
      }
      router.push(data.next || "/admin");
      router.refresh();
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label className="block text-[13px] font-medium text-ink/80">
        Senha
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          className="mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-[15px] outline-none focus:border-navy"
        />
      </label>
      {error && <p className="text-[13px] text-[#9A3B2E]">{error}</p>}
      <button type="submit" disabled={loading} className="btn-navy w-full disabled:opacity-60">
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
