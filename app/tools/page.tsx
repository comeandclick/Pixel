"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scissors, ImageIcon, Compass as Compress, Eraser, Maximize, Video } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

const tools = [
  {
    id: "bg-removal",
    icon: Scissors,
    name: "tools.bg_removal",
    description: "tools.bg_removal_desc",
    href: "/tools/background-removal",
    category: "Image",
    popular: true,
  },
  {
    id: "format-converter",
    icon: ImageIcon,
    name: "tools.format_converter",
    description: "tools.format_converter_desc",
    href: "/tools/format-converter",
    category: "Image",
    popular: true,
  },
  {
    id: "image-compressor",
    icon: Compress,
    name: "tools.image_compressor",
    description: "tools.image_compressor_desc",
    href: "/tools/image-compressor",
    category: "Image",
    popular: false,
  },
  {
    id: "watermark-remover",
    icon: Eraser,
    name: "tools.watermark_remover",
    description: "tools.watermark_remover_desc",
    href: "/tools/watermark-remover",
    category: "Image",
    popular: false,
  },
  {
    id: "image-resizer",
    icon: Maximize,
    name: "tools.image_resizer",
    description: "tools.image_resizer_desc",
    href: "/tools/image-resizer",
    category: "Image",
    popular: false,
  },
  {
    id: "video-compressor",
    icon: Video,
    name: "tools.video_compressor",
    description: "tools.video_compressor_desc",
    href: "/tools/video-compressor",
    category: "Video",
    popular: true,
  },
]

const categories = ["All", "Image", "Video", "Document", "Design"]

export default function ToolsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-4">{t("tools.title")}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("tools.subtitle")}</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Badge
              key={category}
              variant="outline"
              className="px-4 py-2 cursor-pointer hover:bg-[#d03232] hover:text-white transition-colors border-gray-600 text-gray-300"
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link href={tool.href}>
                <Card className="tool-card h-full cursor-pointer relative overflow-hidden">
                  {tool.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-[#d03232] text-white">Popular</Badge>
                    </div>
                  )}

                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>

                    <div className="mb-3">
                      <Badge variant="secondary" className="text-xs mb-2 bg-gray-800 text-gray-300">
                        {tool.category}
                      </Badge>
                      <h3 className="text-lg font-semibold text-white">{t(tool.name)}</h3>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed">{t(tool.description)}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">More Tools Coming Soon</h2>
          <p className="text-gray-400 mb-8">We're constantly adding new tools to help you create amazing content</p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {["AI Image Upscaler", "Voice Changer", "GIF Maker"].map((tool, index) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-xl text-center"
              >
                <div className="w-12 h-12 bg-[#d03232]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-[#d03232]/40 rounded animate-pulse" />
                </div>
                <h3 className="font-medium text-white">{tool}</h3>
                <p className="text-sm text-gray-400 mt-1">Coming Soon</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
