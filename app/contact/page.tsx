export const metadata = {
  title: "Contact - Ted's Zaza",
  description: "Get in touch with Ted's Zaza",
};

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="section-title mb-8">Contact Us</h1>
      
      <div className="card p-8 space-y-6">
        <p className="text-lg leading-8">
          Have a question, suggestion, or just want to say hi? We'd love to hear from you!
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-[color:var(--tomato-dark)] mb-2">
              Email
            </h2>
            <a 
              href="mailto:tedkim0420@gmail.com"
              className="text-lg text-[color:var(--tomato)] hover:underline"
            >
              tedkim0420@gmail.com
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[color:var(--tomato-dark)] mb-2">
              Social Media
            </h2>
            <p className="text-lg">
              Follow us on TikTok for the latest pizza recipes and tips!
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[color:var(--tomato)]/20">
          <p className="text-base leading-7">
            We typically respond within 24-48 hours during business days.
          </p>
        </div>
      </div>
    </div>
  );
}