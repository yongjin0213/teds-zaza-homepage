"use client";

import type { Post } from "../types";

type PostListProps = {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
};

export default function PostList({ posts, onEdit, onDelete }: PostListProps) {
  return (
    <div className="grid gap-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="rounded-3xl border-2 border-dashed border-[color:var(--tomato)] bg-white/70 p-4"
        >
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-sm text-[color:var(--ink)]">{post.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              className="rounded-full bg-[color:var(--tomato)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white"
              onClick={() => onEdit(post)}
            >
              Edit
            </button>
            <button
              className="rounded-full border-2 border-[color:var(--tomato)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)]"
              onClick={() => onDelete(post.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
