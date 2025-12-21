import { sql } from "./db";

export type AboutParagraph = {
  id: number;
  content: string;
  position: number;
};

export const getAboutParagraphs = async (): Promise<AboutParagraph[]> => {
  const rows = (await sql`
    select id, content, position
    from about_paragraphs
    order by position asc, id asc
  `) as AboutParagraph[];
  return rows;
};
