"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { emptyPost, emptyProduct } from "./constants";
import type { Post, Product } from "./types";
import AdminHeader from "./components/AdminHeader";
import { signIn, signOut, useSession } from "next-auth/react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

type RecipeApiItem = {
  id: string;
  title: string;
  summary: string;
  image: string;
  tag: string;
  vidid: string;
  story: string[];
  ingredients: string[];
  steps: string[];
};

type AboutParagraph = {
  id: number;
  content: string;
  position: number;
};

export default function AdminPage() {
  const { status, data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [aboutParagraphs, setAboutParagraphs] = useState<AboutParagraph[]>([]);
  const [newAbout, setNewAbout] = useState({ content: "", position: 0 });
  const [editingAbout, setEditingAbout] = useState<AboutParagraph | null>(null);
  const [newPost, setNewPost] = useState<Post>(emptyPost);
  const [newProduct, setNewProduct] = useState<Product>(emptyProduct);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);


  const handleAddPost = async (event: FormEvent) => {
    event.preventDefault();
    if (!newPost.title.trim() || !newPost.thumbnail.trim()) return;
    const id = newPost.title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const payload = {
      id,
      title: newPost.title,
      summary: newPost.description,
      image: newPost.thumbnail,
      tag: newPost.tag.trim() || "Admin",
      vidId: newPost.vidid || "/images/recipes/tiktok-placeholder.svg",
      story: newPost.inspiration ? [newPost.inspiration] : [],
      ingredients: newPost.ingredients
        ? newPost.ingredients.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      steps: newPost.steps
        ? newPost.steps.split("\n").map((item) => item.trim()).filter(Boolean)
        : [],
    };

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create recipe");
      }
      await fetchPosts();
      setNewPost(emptyPost);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = async (event: FormEvent) => {
    event.preventDefault();
    if (!newProduct.name.trim() || !newProduct.image.trim()) return;
    const id = newProduct.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const payload = {
      id,
      name: newProduct.name,
      price: newProduct.price,
      image: newProduct.image,
      link: newProduct.link,
      badge: newProduct.badge,
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      await fetchProducts();
      setNewProduct(emptyProduct);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePost = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingPost) return;
    if (!editingPost.thumbnail.trim()) return;

    const payload = {
      title: editingPost.title,
      summary: editingPost.description,
      image: editingPost.thumbnail,
      tag: editingPost.tag.trim() || "Admin",
      videoEmbed: editingPost.vidid || "/images/recipes/tiktok-placeholder.svg",
      story: editingPost.inspiration ? [editingPost.inspiration] : [],
      ingredients: editingPost.ingredients
        ? editingPost.ingredients.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
      steps: editingPost.steps
        ? editingPost.steps.split("\n").map((item) => item.trim()).filter(Boolean)
        : [],
    };

    try {
      const response = await fetch(`/api/recipes/${editingPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update recipe");
      }

      await fetchPosts();
      setEditingPost(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateProduct = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingProduct) return;
    if (!editingProduct.image.trim()) return;

    const payload = {
      name: editingProduct.name,
      price: editingProduct.price,
      image: editingProduct.image,
      link: editingProduct.link,
      badge: editingProduct.badge,
    };

    try {
      const response = await fetch(`/api/products/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      await fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/recipes/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete recipe");
      }
      await fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      await fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddAbout = async (event: FormEvent) => {
    event.preventDefault();
    if (!newAbout.content.trim()) return;
    try {
      const response = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newAbout.content,
          position: Number(newAbout.position) || 0,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create about paragraph");
      }
      await fetchAbout();
      setNewAbout({ content: "", position: 0 });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAbout = async (event: FormEvent) => {
    event.preventDefault();
    if (!editingAbout) return;
    try {
      const response = await fetch(`/api/about/${editingAbout.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: editingAbout.content,
          position: Number(editingAbout.position) || 0,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update about paragraph");
      }
      await fetchAbout();
      setEditingAbout(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAbout = async (id: number) => {
    try {
      const response = await fetch(`/api/about/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete about paragraph");
      }
      await fetchAbout();
    } catch (error) {
      console.error(error);
    }
  };

  const updateNewPost = (field: keyof Post, value: string) => {
    setNewPost((prev) => ({ ...prev, [field]: value }));
  };

  const updateEditingPost = (field: keyof Post, value: string) => {
    setEditingPost((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const updateNewProduct = (field: keyof Product, value: string | number) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  const updateEditingProduct = (
    field: keyof Product,
    value: string | number
  ) => {
    setEditingProduct((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to load products");
      }
      const data = (await response.json()) as Product[];
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAbout = async () => {
    try {
      const response = await fetch("/api/about");
      if (!response.ok) {
        throw new Error("Failed to load about paragraphs");
      }
      const data = (await response.json()) as AboutParagraph[];
      setAboutParagraphs(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/recipes");
      if (!response.ok) {
        throw new Error("Failed to load recipes");
      }
      const data = (await response.json()) as RecipeApiItem[];
      setPosts(
        data.map((recipe) => ({
          id: recipe.id,
          title: recipe.title,
          description: recipe.summary,
          inspiration: recipe.story?.[0] ?? "",
          ingredients: recipe.ingredients?.join(", ") ?? "",
          steps: recipe.steps?.join("\n") ?? "",
          thumbnail: recipe.image,
          vidid: recipe.vidid,
          tag: recipe.tag,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchProducts();
    fetchAbout();
  }, []);

  const uploadImage = async (file: File, folder: string) => {
    const response = await fetch("/api/uploads/s3", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: file.name,
        contentType: file.type || "application/octet-stream",
        folder,
      }),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(
        `Failed to request upload URL (${response.status}): ${message}`
      );
    }
    console.log("Response was okay!")
    const { uploadUrl, publicUrl } = (await response.json()) as {
      uploadUrl: string;
      publicUrl: string;
    };
    console.log(uploadUrl)
    const upload = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: file,
    });

    if (!upload.ok) {
      const message = await upload.text();
      throw new Error(
        `Failed to upload image (${upload.status}): ${message || "Unknown error"}`
      );
    }

    return publicUrl;
  };

  const handleUploadNewPostImage = async (file: File) => {
    try {
      const url = await uploadImage(file, "recipes");
      setNewPost((prev) => ({ ...prev, thumbnail: url }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadEditingPostImage = async (file: File) => {
    try {
      const url = await uploadImage(file, "recipes");
      setEditingPost((prev) => (prev ? { ...prev, thumbnail: url } : prev));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadNewProductImage = async (file: File) => {
    try {
      const url = await uploadImage(file, "products");
      setNewProduct((prev) => ({ ...prev, image: url }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadEditingProductImage = async (file: File) => {
    try {
      const url = await uploadImage(file, "products");
      setEditingProduct((prev) => (prev ? { ...prev, image: url } : prev));
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-md">
        <div className="card p-8 grid gap-6 reveal">
          <div className="checker-band w-24" />
          <h1 className="section-title text-3xl">Checking Access</h1>
          <p className="text-sm uppercase tracking-widest text-[color:var(--tomato-dark)]">
            Hold tight while we verify your account.
          </p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="mx-auto max-w-md">
        <div className="card p-8 grid gap-6 reveal">
          <div className="checker-band w-24" />
          <h1 className="section-title text-3xl">Admin Login</h1>
          <p className="text-sm uppercase tracking-widest text-[color:var(--tomato-dark)]">
            Sign in with your allowlisted Google account.
          </p>
          <button
            className="rounded-full bg-[color:var(--tomato-dark)] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-12">
      <AdminHeader
        title="Admin CMS"
        description="Add new recipe posts, update notes, and keep the affiliate shelf sharp."
      />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--tomato-dark)]">
          Signed in as {session?.user?.email}
        </p>
        <button
          className="rounded-full border-2 border-[color:var(--tomato)] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)]"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Sign out
        </button>
      </div>

      <section className="grid gap-6">
        <details className="card p-6 grid gap-6 reveal reveal-delay-1" open>
          <summary className="text-2xl font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)] cursor-pointer">
            Create Post
          </summary>
          <PostForm
            post={newPost}
            onChange={updateNewPost}
            onSubmit={handleAddPost}
            submitLabel="Publish Post"
            onUploadImage={handleUploadNewPostImage}
          />
        </details>

        <details className="card p-6 grid gap-6 reveal reveal-delay-2">
          <summary className="text-2xl font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)] cursor-pointer">
            Create Product
          </summary>
          <ProductForm
            product={newProduct}
            onChange={updateNewProduct}
            onSubmit={handleAddProduct}
            submitLabel="Publish Product"
            onUploadImage={handleUploadNewProductImage}
          />
        </details>

        <details className="card p-6 grid gap-6 reveal reveal-delay-3">
          <summary className="text-2xl font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)] cursor-pointer">
            Edit Posts
          </summary>
          {editingPost && (
            <PostForm
              post={editingPost}
              onChange={updateEditingPost}
              onSubmit={handleUpdatePost}
              submitLabel="Save Post"
              showCancel
              onCancel={() => setEditingPost(null)}
              onUploadImage={handleUploadEditingPostImage}
            />
          )}
          <PostList
            posts={posts}
            onEdit={setEditingPost}
            onDelete={handleDeletePost}
          />
        </details>

        <details className="card p-6 grid gap-6 reveal reveal-delay-4">
          <summary className="text-2xl font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)] cursor-pointer">
            Edit Products
          </summary>
          {editingProduct && (
            <ProductForm
              product={editingProduct}
              onChange={updateEditingProduct}
              onSubmit={handleUpdateProduct}
              submitLabel="Save Product"
              showCancel
              onCancel={() => setEditingProduct(null)}
              onUploadImage={handleUploadEditingProductImage}
            />
          )}
          <ProductList
            products={products}
            onEdit={setEditingProduct}
            onDelete={handleDeleteProduct}
          />
        </details>

        <details className="card p-6 grid gap-6 reveal reveal-delay-5">
          <summary className="text-2xl font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)] cursor-pointer">
            Create About Paragraph
          </summary>
          <form className="grid gap-3" onSubmit={handleAddAbout}>
            <textarea
              className="min-h-[120px] rounded-3xl border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-3 text-sm"
              placeholder="About content"
              value={newAbout.content}
              onChange={(event) =>
                setNewAbout((prev) => ({ ...prev, content: event.target.value }))
              }
            />
            <input
              className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-2 text-sm"
              placeholder="Position (0 = first)"
              type="number"
              value={newAbout.position}
              onChange={(event) =>
                setNewAbout((prev) => ({
                  ...prev,
                  position: Number(event.target.value),
                }))
              }
            />
            <button className="rounded-full bg-[color:var(--tomato)] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white">
              Publish Paragraph
            </button>
          </form>
        </details>

        <details className="card p-6 grid gap-6 reveal reveal-delay-6">
          <summary className="text-2xl font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)] cursor-pointer">
            Edit About
          </summary>
          {editingAbout && (
            <form className="grid gap-3" onSubmit={handleUpdateAbout}>
              <textarea
                className="min-h-[120px] rounded-3xl border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-3 text-sm"
                value={editingAbout.content}
                onChange={(event) =>
                  setEditingAbout((prev) =>
                    prev ? { ...prev, content: event.target.value } : prev
                  )
                }
              />
              <input
                className="rounded-full border-2 border-[color:var(--tomato)] bg-white/80 px-4 py-2 text-sm"
                type="number"
                value={editingAbout.position}
                onChange={(event) =>
                  setEditingAbout((prev) =>
                    prev
                      ? { ...prev, position: Number(event.target.value) }
                      : prev
                  )
                }
              />
              <div className="flex gap-2">
                <button className="rounded-full bg-[color:var(--tomato-dark)] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white">
                  Save Paragraph
                </button>
                <button
                  type="button"
                  className="rounded-full border-2 border-[color:var(--tomato)] px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)]"
                  onClick={() => setEditingAbout(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
          <div className="grid gap-3">
            {aboutParagraphs.map((paragraph) => (
              <div
                key={paragraph.id}
                className="rounded-3xl border-2 border-dashed border-[color:var(--tomato)] bg-white/70 p-4"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--tomato-dark)]">
                  Position {paragraph.position}
                </p>
                <p className="text-sm text-[color:var(--ink)]">
                  {paragraph.content}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    className="rounded-full bg-[color:var(--tomato)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white"
                    onClick={() => setEditingAbout(paragraph)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded-full border-2 border-[color:var(--tomato)] px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[color:var(--tomato-dark)]"
                    onClick={() => handleDeleteAbout(paragraph.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </details>
      </section>
    </div>
  );
}
