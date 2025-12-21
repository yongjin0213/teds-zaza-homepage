import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

type AboutPayload = {
  content: string;
  position?: number;
};

export async function GET() {
  const rows = await sql<{ id: number; content: string; position: number }[]>`
    select id, content, position
    from about_paragraphs
    order by position asc, id asc
  `;
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const payload = (await request.json()) as AboutPayload;

  if (!payload?.content?.trim()) {
    return NextResponse.json(
      { error: "Content is required" },
      { status: 400 }
    );
  }

  const position = payload.position ?? 0;

  await sql`
    insert into about_paragraphs (content, position)
    values (${payload.content}, ${position})
  `;

  return NextResponse.json({ ok: true });
}
