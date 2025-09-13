"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Zap, Shield, Users } from "lucide-react"

export default function HomePage() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Zap,
      title: t("features.fast_processing"),
      description: t("features.fast_processing.desc"),
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Shield,
      title: t("features.secure_private"),
      description: t("features.secure_private.desc"),
      gradient: "from-green-500/20 to-teal-500/20",
    },
    {
      icon: Users,
      title: t("features.easy_to_use"),
      description: t("features.easy_to_use.desc"),
      gradient: "from-purple-500/20 to-indigo-500/20",
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="gradient-hero py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance gradient-text">{t("home.hero.title")}</h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300"
              asChild
            >
              <Link href="/tools">{t("home.hero.cta")}</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="glass-effect hover:bg-white/10 transition-all duration-300 bg-transparent"
              asChild
            >
              <Link href="/tools">{t("home.hero.secondary")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">{t("features.why_choose_pixel")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("features.why_choose_pixel.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <feature.icon className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="glass-effect rounded-3xl p-16 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">{t("home.cta.title")}</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              {t("home.cta.subtitle")}
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 px-8 py-4 text-lg"
              asChild
            >
              <Link href="/tools">{t("home.hero.cta")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
