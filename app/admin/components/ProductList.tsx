"use client";

import type { Product } from "../types";

type ProductListProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

export default function ProductList({
  products,
  onEdit,
  onDelete,
}: ProductListProps) {
  return (
    <div className="grid gap-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="rounded-3xl border-2 border-dashed border-[color:var(--tomato)] bg-white/70 p-4"
        >
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-[color:var(--ink)]">
            {product.price}
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--tomato-dark)]">
            {product.badge}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              className="rounded-full bg-[color:var(--tomato)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white"
              onClick={() => onEdit(product)}
            >
              Edit
            </button>
            <button
              className="rounded-full border-2 border-[color:var(--tomato)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)]"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
