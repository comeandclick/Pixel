"use client"

import { useLanguage } from "@/components/language-provider"

export default function TermsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 gradient-text">{t("legal.terms.title")}</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">{t("terms.last_updated")}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("terms.acceptance.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("terms.acceptance.desc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("terms.license.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("terms.license.desc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("terms.disclaimer.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("terms.disclaimer.desc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("terms.contact.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("terms.contact.desc")}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
