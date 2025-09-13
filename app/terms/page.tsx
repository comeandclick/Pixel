export default function TermsPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">Last updated: December 2024</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By accessing and using Pixel's services, you accept and agree to be bound by the terms and provision of
              this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Permission is granted to temporarily use Pixel's services for personal, non-commercial transitory viewing
              only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The materials on Pixel's website are provided on an 'as is' basis. Pixel makes no warranties, expressed or
              implied.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, please contact us at legal@pixel-tools.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
