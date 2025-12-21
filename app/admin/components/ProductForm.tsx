"use client";

import type React from "react";
import type { Product } from "../types";

type ProductFormProps = {
  product: Product;
  onChange: (field: keyof Product, value: string | number) => void;
  onSubmit: (event: React.FormEvent) => void;
  submitLabel: string;
  showCancel?: boolean;
  onCancel?: () => void;
  onUploadImage?: (file: File) => void;
};

export default function ProductForm({
  product,
  onChange,
  onSubmit,
  submitLabel,
  showCancel,
  onCancel,
  onUploadImage,
}: ProductFormProps) {
  return (
    <form className="grid gap-3" onSubmit={onSubmit}>
      <input
        className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-2 text-sm"
        placeholder="Product name"
        value={product.name}
        onChange={(event) => onChange("name", event.target.value)}
      />
      <input
        className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-2 text-sm"
        placeholder="Price (ex: $18.00)"
        value={product.price}
        onChange={(event) => onChange("price", event.target.value)}
      />
      <input
        className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-2 text-sm"
        placeholder="Image URL"
        value={product.image}
        onChange={(event) => onChange("image", event.target.value)}
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
        placeholder="Affiliate link"
        value={product.link}
        onChange={(event) => onChange("link", event.target.value)}
      />
      <input
        className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-2 text-sm"
        placeholder="Badge"
        value={product.badge}
        onChange={(event) => onChange("badge", event.target.value)}
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
