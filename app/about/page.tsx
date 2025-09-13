"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Zap, Shield } from "lucide-react"

export default function AboutPage() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Nous utilisons une technologie IA de pointe pour fournir les outils d'édition d'images les plus avancés disponibles.",
    },
    {
      icon: Shield,
      title: "Confidentialité",
      description:
        "La sécurité de vos données est notre priorité. Tout le traitement se fait de manière sécurisée et les fichiers ne sont jamais stockés.",
    },
    {
      icon: Users,
      title: "Accessibilité",
      description:
        "Des outils de qualité professionnelle rendus simples et accessibles à tous, quel que soit votre niveau technique.",
    },
    {
      icon: Target,
      title: "Qualité",
      description:
        "Nous nous engageons à fournir des résultats exceptionnels avec chaque outil et fonctionnalité que nous développons.",
    },
  ]

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">{t("about.title")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t("about.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 gradient-text">Notre Histoire</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Fondé en 2024, Pixel est né d'une observation simple : l'édition d'images professionnelle ne devrait pas
                nécessiter des années de formation ou des logiciels coûteux. Notre équipe de chercheurs en IA et de
                designers s'est donné pour mission de créer des outils qui offrent des résultats professionnels avec une
                simplicité grand public.
              </p>
              <p>
                Aujourd'hui, des milliers d'utilisateurs font confiance à Pixel pour leurs besoins d'édition d'images,
                des créateurs de contenu et marketeurs aux propriétaires de petites entreprises et aux amateurs. Nos
                outils alimentés par l'IA traitent des millions d'images chaque mois, aidant les utilisateurs à
                économiser du temps et à obtenir de meilleurs résultats.
              </p>
            </div>
          </div>

          <div className="gradient-card rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 gradient-text">Notre Mission</h3>
            <p className="text-muted-foreground leading-relaxed">{t("about.description")}</p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="gradient-card text-center hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-foreground">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
