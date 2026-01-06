import type { Post, Product } from "./types";

export const emptyPost: Post = {
  id: "",
  title: "",
  description: "",
  inspiration: "",
  ingredients: "",
  steps: "",
  thumbnail: "",
  vidid: "",
  tag: "",
};

export const emptyProduct: Product = {
  id: "",
  name: "",
  price: "",
  image: "",
  link: "",
  badge: "",
};
