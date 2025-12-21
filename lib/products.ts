import { sql } from "./db";

export type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  link: string;
  badge: string;
};

type DbProduct = {
  id: string;
  name: string;
  price: string;
  image: string;
  link: string;
  badge: string;
};

const mapProduct = (row: DbProduct): Product => ({
  id: row.id,
  name: row.name,
  price: row.price,
  image: row.image,
  link: row.link,
  badge: row.badge,
});

export const getProducts = async (): Promise<Product[]> => {
  const rows = await sql<DbProduct[]>`
    select id, name, price, image, link, badge
    from products
    order by created_at desc
  `;
  return rows.map(mapProduct);
};
