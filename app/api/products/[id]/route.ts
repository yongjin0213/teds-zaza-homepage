import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

type RouteParams = {
  params: Promise<{ id: string }>;
};

type ProductUpdatePayload = {
  name?: string;
  price?: string;
  image?: string;
  link?: string;
  badge?: string;
};

export async function DELETE(_: Request, { params }: RouteParams) {
  const { id } = await params;
  await sql`delete from products where id = ${id}`;
  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const payload = (await request.json()) as ProductUpdatePayload;

  const rows = (await sql`
    update products
    set
      name = coalesce(${payload.name}, name),
      price = coalesce(${payload.price}, price),
      image = coalesce(${payload.image}, image),
      link = coalesce(${payload.link}, link),
      badge = coalesce(${payload.badge}, badge)
    where id = ${id}
    returning id
  `) as { id: string }[];

  if (!rows.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
