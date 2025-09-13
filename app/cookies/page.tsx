export default function CookiesPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Cookie Policy</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: December 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">What Are Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Cookies</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies to improve your experience on our website, remember your preferences, and analyze how our
              site is used.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Types of Cookies We Use</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Essential cookies: Required for the website to function properly</li>
              <li>Analytics cookies: Help us understand how visitors use our website</li>
              <li>Preference cookies: Remember your settings and preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can control and manage cookies through your browser settings. Please note that removing or blocking
              cookies may impact your user experience.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
