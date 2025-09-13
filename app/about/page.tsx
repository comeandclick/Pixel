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
      description: "We leverage cutting-edge AI technology to provide the most advanced image editing tools available.",
    },
    {
      icon: Shield,
      title: "Privacy",
      description: "Your data security is our priority. All processing happens securely and files are never stored.",
    },
    {
      icon: Users,
      title: "Accessibility",
      description:
        "Professional-grade tools made simple and accessible for everyone, regardless of technical expertise.",
    },
    {
      icon: Target,
      title: "Quality",
      description: "We're committed to delivering exceptional results with every tool and feature we develop.",
    },
  ]

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">About Pixel</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize professional image editing through AI-powered tools that are both powerful
            and easy to use.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Founded in 2024, Pixel emerged from a simple observation: professional image editing shouldn't require
                years of training or expensive software. Our team of AI researchers and designers set out to create
                tools that deliver professional results with consumer simplicity.
              </p>
              <p>
                Today, thousands of users trust Pixel for their image editing needs, from content creators and marketers
                to small business owners and hobbyists. Our AI-powered tools process millions of images monthly, helping
                users save time and achieve better results.
              </p>
            </div>
          </div>

          <div className="gradient-card rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To make professional-quality image editing accessible to everyone through innovative AI technology, while
              maintaining the highest standards of privacy and security.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="gradient-card text-center">
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
