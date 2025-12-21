import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

type RouteParams = {
  params: Promise<{ id: string }>;
};

type AboutUpdatePayload = {
  content?: string;
  position?: number;
};

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const payload = (await request.json()) as AboutUpdatePayload;

  const rows = (await sql`
    update about_paragraphs
    set
      content = coalesce(${payload.content}, content),
      position = coalesce(${payload.position}, position)
    where id = ${Number(id)}
    returning id
  `) as { id: number }[];

  if (!rows.length) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: RouteParams) {
  const { id } = await params;
  await sql`delete from about_paragraphs where id = ${Number(id)}`;
  return NextResponse.json({ ok: true });
}
