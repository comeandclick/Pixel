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
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: t("tools.image_compressor"),
      description: t("tools.image_compressor.desc"),
      icon: ImageIcon,
      href: "/tools/image-compressor",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: t("tools.image_resizer"),
      description: t("tools.image_resizer.desc"),
      icon: Maximize,
      href: "/tools/image-resizer",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: t("tools.format_converter"),
      description: t("tools.format_converter.desc"),
      icon: RefreshCw,
      href: "/tools/format-converter",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: t("tools.video_compressor"),
      description: t("tools.video_compressor.desc"),
      icon: Video,
      href: "/tools/video-compressor",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: t("tools.watermark_remover"),
      description: t("tools.watermark_remover.desc"),
      icon: Droplets,
      href: "/tools/watermark-remover",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50",
    },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t("nav.tools")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional AI-powered tools for all your image and video editing needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-md"
            >
              <Link href={tool.href}>
                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-xl ${tool.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <tool.icon className={`h-8 w-8 ${tool.color}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-[#d03232] transition-colors">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{tool.description}</CardDescription>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
