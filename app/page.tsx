"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { ImageIcon, Scissors, Maximize, RefreshCw, Video, Droplets, Zap, Shield, Users, Sparkles } from "lucide-react"

export default function HomePage() {
  const { t } = useLanguage()

  const tools = [
    {
      title: t("tools.background_removal"),
      description: t("tools.background_removal.desc"),
      icon: Scissors,
      href: "/tools/background-removal",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: t("tools.image_compressor"),
      description: t("tools.image_compressor.desc"),
      icon: ImageIcon,
      href: "/tools/image-compressor",
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: t("tools.image_resizer"),
      description: t("tools.image_resizer.desc"),
      icon: Maximize,
      href: "/tools/image-resizer",
      gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: t("tools.format_converter"),
      description: t("tools.format_converter.desc"),
      icon: RefreshCw,
      href: "/tools/format-converter",
      gradient: "from-orange-500/20 to-red-500/20",
    },
    {
      title: t("tools.video_compressor"),
      description: t("tools.video_compressor.desc"),
      icon: Video,
      href: "/tools/video-compressor",
      gradient: "from-red-500/20 to-rose-500/20",
    },
    {
      title: t("tools.watermark_remover"),
      description: t("tools.watermark_remover.desc"),
      icon: Droplets,
      href: "/tools/watermark-remover",
      gradient: "from-cyan-500/20 to-blue-500/20",
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Fast Processing",
      description: "Lightning-fast AI processing for all your image editing needs",
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your files are processed securely and never stored on our servers",
      gradient: "from-green-500/20 to-teal-500/20",
    },
    {
      icon: Users,
      title: "Easy to Use",
      description: "Simple drag-and-drop interface that anyone can use",
      gradient: "from-purple-500/20 to-indigo-500/20",
    },
  ]

  return (
    <div className="min-h-screen">
      <section className="gradient-hero py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 glass-effect">
            <Sparkles className="h-4 w-4" />
            AI-Powered Image Tools
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance bg-gradient-to-r from-white via-white to-primary bg-clip-text text-transparent">
            {t("home.hero.title")}
          </h1>
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
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{t("nav.tools")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose from our collection of powerful AI-powered tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Card
                key={index}
                className="gradient-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer group border-border/50 hover:border-primary/30"
              >
                <Link href={tool.href}>
                  <CardHeader className="p-8">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Why Choose Pixel?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Professional-grade tools with enterprise security and consumer simplicity
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
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to transform your images?</h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of users who trust Pixel for their image editing needs
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 px-8 py-4 text-lg"
              asChild
            >
              <Link href="/signup">{t("nav.signup")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
