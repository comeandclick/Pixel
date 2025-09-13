"use client";
import { useState } from "react";

export default function UploadClient({ endpoint, accept = "image/*", extraFields }: {
  endpoint: string; accept?: string; extraFields?: Record<string, string>;
}) {
  const [src, setSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = (e.currentTarget.elements.namedItem("file") as HTMLInputElement).files?.[0];
    if (!file) return;
    setLoading(true);
    const fd = new FormData();
    fd.append("file", file);
    if (extraFields) {
      Object.entries(extraFields).forEach(([k, v]) => fd.append(k, v));
    }
    const r = await fetch(endpoint, { method: "POST", body: fd });
    const blob = await r.blob();
    setSrc(URL.createObjectURL(blob));
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 p-6 rounded-2xl border max-w-2xl">
      <input name="file" type="file" accept={accept} className="block" />
      <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20">Lancer</button>
      {loading && <p>Traitement…</p>}
      {src && (accept.startsWith("image")
        ? <img src={src} alt="" className="mt-4 max-w-full rounded-xl" />
        : <video src={src} controls className="mt-4 w-full rounded-xl" />)}
    </form>
  );
}