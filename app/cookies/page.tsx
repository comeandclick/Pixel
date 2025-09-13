"use client"

import { useLanguage } from "@/components/language-provider"

export default function CookiesPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 gradient-text">{t("legal.cookies.title")}</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-6">{t("cookies.last_updated")}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("cookies.what_are.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("cookies.what_are.desc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("cookies.how_use.title")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">{t("cookies.how_use.desc")}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("cookies.types.title")}</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>{t("cookies.types.essential")}</li>
              <li>{t("cookies.types.analytics")}</li>
              <li>{t("cookies.types.preferences")}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{t("cookies.manage.title")}</h2>
            <p className="text-muted-foreground leading-relaxed">{t("cookies.manage.desc")}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
