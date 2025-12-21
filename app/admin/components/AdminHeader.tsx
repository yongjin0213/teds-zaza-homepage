"use client";

type AdminHeaderProps = {
  title: string;
  description: string;
};

export default function AdminHeader({ title, description }: AdminHeaderProps) {
  return (
    <section className="grid gap-4 reveal">
      <div className="checker-band w-28" />
      <h1 className="section-title">{title}</h1>
      <p className="text-lg">{description}</p>
    </section>
  );
}
