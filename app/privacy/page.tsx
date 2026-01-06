export const metadata = {
  title: "Privacy Policy - Ted's Zaza",
  description: "Privacy policy for Ted's Zaza pizza recipes website",
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="section-title mb-8">Privacy Policy</h1>
      
      <div className="card p-8 space-y-6 text-base leading-7">
        <section>
          <h2 className="text-2xl font-semibold text-[color:var(--tomato-dark)] mb-4">
            Introduction
          </h2>
          <p>
            Welcome to Ted's Zaza. This Privacy Policy explains how we collect, use, 
            and protect your information when you visit our website at tedszaza.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[color:var(--tomato-dark)] mb-4">
            Information We Collect
          </h2>
          <p>
            We may collect information about your device, browsing actions, and patterns. 
            We collect this through cookies and similar technologies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[color:var(--tomato-dark)] mb-4">
            Google AdSense and Advertising
          </h2>
          <p>
            We use Google AdSense to display advertisements on our website. Google AdSense 
            uses cookies to serve ads based on your prior visits to our website or other websites. 
            Google's use of advertising cookies enables it and its partners to serve ads based on 
            your visit to our site and/or other sites on the Internet.
          </p>
          <p className="mt-4">
            You may opt out of personalized advertising by visiting{" "}
            <a 
              href="https://www.google.com/settings/ads" 
              className="text-[color:var(--tomato)] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[color:var(--tomato-dark)] mb-4">
            Cookies
          </h2>
          <p>
            Cookies are small text files stored on your device. We use cookies for analytics 
            and advertising purposes. You can control cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[color:var(--tomato-dark)] mb-4">
            Third-Party Services
          </h2>
          <p>
            We may use third-party services such as Google Analytics and Google AdSense, 
            which may collect information used to identify you. These services have their 
            own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[color:var(--tomato-dark)] mb-4">
            Your Rights
          </h2>
          <p>
            You have the right to access, update, or delete your personal information. 
            You can also object to processing and request data portability.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[color:var(--tomato-dark)] mb-4">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of 
            any changes by posting the new policy on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-[color:var(--tomato-dark)] mb-4">
            Contact Us
          </h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{" "}
            <a 
              href="mailto:tedkim0420@gmail.com" 
              className="text-[color:var(--tomato)] hover:underline"
            >
              tedkim0420@gmail.com
            </a>
          </p>
        </section>

        <p className="text-sm text-gray-600 mt-8">
          Last Updated: January 6, 2026
        </p>
      </div>
    </div>
  );
}