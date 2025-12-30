import Image from "next/image";
import { getAboutParagraphs } from "@/lib/about";

export default async function AboutPage() {
  const paragraphs = await getAboutParagraphs();
  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="grid gap-4 reveal">
        <div className="checker-band w-28" />
        <h1 className="section-title">About Ted's Zaza</h1>
        {paragraphs.length ? (
          paragraphs.map((paragraph) => (
            <p key={paragraph.id} className="text-lg leading-8">
              {paragraph.content}
            </p>
          ))
        ) : (
          <p className="text-lg leading-8">
            Add About paragraphs in the admin dashboard to see them here.
          </p>
        )}
      </section>
      <aside className="card p-6 grid gap-4 self-start reveal reveal-delay-2">
        <Image
          src="/images/ted.jpeg"
          alt="Photo of Teddy"
          width={520}
          height={420}
          className="h-auto w-full rounded-lg"
          priority
        />
      </aside>
    </div>
  );
}
