"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { ImageIcon, Scissors, Maximize, RefreshCw, Video, Droplets } from "lucide-react"

export default function ToolsPage() {
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

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">{t("nav.tools")}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Outils professionnels alimentés par l'IA pour tous vos besoins d'édition d'images et de vidéos
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
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {tool.description}
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
