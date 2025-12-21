import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";
import { sql } from "@/lib/db";

type ProductPayload = {
  id: string;
  name: string;
  price: string;
  image: string;
  link: string;
  badge: string;
};

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ProductPayload;

  if (!payload?.id || !payload?.name || !payload?.price || !payload?.image) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  await sql`
    insert into products (id, name, price, image, link, badge)
    values (
      ${payload.id},
      ${payload.name},
      ${payload.price},
      ${payload.image},
      ${payload.link},
      ${payload.badge}
    )
    on conflict (id) do update set
      name = excluded.name,
      price = excluded.price,
      image = excluded.image,
      link = excluded.link,
      badge = excluded.badge
  `;

  return NextResponse.json({ ok: true });
}
