"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { Check, Star, Zap, Shield, Users, Crown } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  const { t } = useLanguage()

  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "/mois",
      description: "Parfait pour commencer",
      features: ["5 images par jour", "Formats de base (JPG, PNG)", "Compression standard", "Support communautaire"],
      icon: Users,
      gradient: "from-blue-500/20 to-cyan-500/20",
      popular: false,
    },
    {
      name: "Pro",
      price: "9€",
      period: "/mois",
      description: "Pour les professionnels",
      features: [
        "Images illimitées",
        "Tous les formats supportés",
        "Compression avancée",
        "Support prioritaire",
        "API access",
        "Traitement par lots",
      ],
      icon: Zap,
      gradient: "from-purple-500/20 to-pink-500/20",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "29€",
      period: "/mois",
      description: "Pour les équipes",
      features: [
        "Tout du plan Pro",
        "Comptes d'équipe",
        "Intégrations personnalisées",
        "Support dédié",
        "SLA garanti",
        "Stockage cloud",
      ],
      icon: Crown,
      gradient: "from-orange-500/20 to-red-500/20",
      popular: false,
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Traitement Ultra-Rapide",
      description: "IA de pointe pour des résultats instantanés",
    },
    {
      icon: Shield,
      title: "Sécurité Maximale",
      description: "Vos données sont protégées et jamais stockées",
    },
    {
      icon: Users,
      title: "Interface Intuitive",
      description: "Conçu pour être utilisé par tous",
    },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">Choisissez Votre Plan</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Des outils d'édition d'images alimentés par l'IA pour tous vos besoins, du simple usage personnel aux
            solutions d'entreprise.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`gradient-card border-border/50 relative ${
                plan.popular ? "ring-2 ring-primary/50 scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Populaire
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mx-auto mb-4`}
                >
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                <div className="flex items-baseline justify-center gap-1 mt-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular ? "bg-primary hover:bg-primary/90" : "bg-secondary hover:bg-secondary/90"
                  }`}
                  asChild
                >
                  <Link href="/signup">{plan.price === "0€" ? "Commencer Gratuitement" : "Choisir ce Plan"}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Pourquoi Choisir Pixel ?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une plateforme complète avec tout ce dont vous avez besoin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="glass-effect rounded-3xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Prêt à Commencer ?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui font confiance à Pixel pour leurs besoins d'édition d'images
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/signup">Essayer Gratuitement</Link>
              </Button>
              <Button size="lg" variant="outline" className="glass-effect bg-transparent" asChild>
                <Link href="/tools">Voir les Outils</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
