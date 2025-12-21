"use client";

import type React from "react";

type AdminLoginCardProps = {
  username: string;
  password: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
};

export default function AdminLoginCard({
  username,
  password,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
}: AdminLoginCardProps) {
  return (
    <div className="mx-auto max-w-md">
      <div className="card p-8 grid gap-6 reveal">
        <div className="checker-band w-24" />
        <h1 className="section-title text-3xl">Admin Login</h1>
        <p className="text-sm uppercase tracking-widest text-[color:var(--tomato-dark)]">
          Enter your creator credentials.
        </p>
        <form className="grid gap-4" onSubmit={onSubmit}>
          <input
            className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-widest"
            placeholder="Username"
            value={username}
            onChange={(event) => onUsernameChange(event.target.value)}
          />
          <input
            className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-5 py-3 text-sm font-semibold uppercase tracking-widest"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
          />
          <button className="rounded-full bg-[color:var(--tomato-dark)] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white">
            Enter Kitchen
          </button>
        </form>
      </div>
    </div>
  );
}
