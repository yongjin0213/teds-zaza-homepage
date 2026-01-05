"use client";

import type React from "react";
import type { Post } from "../types";

type PostFormProps = {
  post: Post;
  onChange: (field: keyof Post, value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  submitLabel: string;
  showCancel?: boolean;
  onCancel?: () => void;
  onUploadImage?: (file: File) => void;
  onTagChange?: (value: string) => void;
};

export default function PostForm({
  post,
  onChange,
  onSubmit,
  submitLabel,
  showCancel,
  onCancel,
  onUploadImage,
  onTagChange,
}: PostFormProps) {
  return (
    <form className="grid gap-3" onSubmit={onSubmit}>
      <input
        className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-2 text-sm"
        placeholder="Post title"
        value={post.title}
        onChange={(event) => onChange("title", event.target.value)}
      />
      <input
        className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-2 text-sm"
        placeholder="Tag (ex: Classic)"
        value={post.tag}
        onChange={(event) =>
          onTagChange
            ? onTagChange(event.target.value)
            : onChange("tag", event.target.value)
        }
      />
      <textarea
        className="min-h-[120px] rounded-3xl border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-3 text-sm"
        placeholder="Description"
        value={post.description}
        onChange={(event) => onChange("description", event.target.value)}
      />
      <textarea
        className="min-h-[120px] rounded-3xl border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-3 text-sm"
        placeholder="Inspiration paragraph"
        value={post.inspiration}
        onChange={(event) => onChange("inspiration", event.target.value)}
      />
      <input
        className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-2 text-sm"
        placeholder="Ingredients (comma separated)"
        value={post.ingredients}
        onChange={(event) => onChange("ingredients", event.target.value)}
      />
      <textarea
        className="min-h-[120px] rounded-3xl border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-3 text-sm"
        placeholder="Steps (one per line)"
        value={post.steps}
        onChange={(event) => onChange("steps", event.target.value)}
      />
      <input
        className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-2 text-sm"
        type="file"
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file && onUploadImage) {
            onUploadImage(file);
          }
        }}
      />
      <input
        className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-2 text-sm"
        placeholder="TikTok embed URL"
        value={post.vidid ?? ""}
        onChange={(event) => onChange("vidid", event.target.value)}
      />
      <div className="flex gap-2">
        <button className="rounded-full bg-[color:var(--tomato)] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white">
          {submitLabel}
        </button>
        {showCancel && (
          <button
            type="button"
            className="rounded-full border-2 border-[color:var(--tomato)] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)]"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
