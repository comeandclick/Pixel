"use client"

import { useLanguage } from "@/components/language-provider"

export default function PrivacyPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 gradient-text">{t("legal.privacy.title")}</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">{t("privacy.last_updated")}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.info_collect.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.info_collect.desc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.how_use.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.how_use.desc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.data_security.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("privacy.data_security.desc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("privacy.contact.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("privacy.contact.desc")}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
