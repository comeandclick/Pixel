"use client"

import type React from "react"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ImageIcon,
  Scissors,
  Download,
  Zap,
  Shield,
  Sparkles,
  ArrowRight,
  Star,
  Users,
  Clock,
  CheckCircle,
  Mail,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const tools = [
  {
    name: "tools.bg_removal",
    description: "tools.bg_removal_desc",
    icon: Scissors,
    href: "/tools/background-removal",
    popular: true,
  },
  {
    name: "tools.format_converter",
    description: "tools.format_converter_desc",
    icon: ImageIcon,
    href: "/tools/format-converter",
    popular: false,
  },
  {
    name: "tools.image_compressor",
    description: "tools.image_compressor_desc",
    icon: Download,
    href: "/tools/image-compressor",
    popular: true,
  },
  {
    name: "tools.watermark_remover",
    description: "tools.watermark_remover_desc",
    icon: Sparkles,
    href: "/tools/watermark-remover",
    popular: false,
  },
]

const features = [
  {
    icon: Zap,
    title: "features.lightning_fast",
    description: "features.lightning_fast_desc",
  },
  {
    icon: Shield,
    title: "features.privacy_first",
    description: "features.privacy_first_desc",
  },
  {
    icon: Sparkles,
    title: "features.ai_powered",
    description: "features.ai_powered_desc",
  },
]

const stats = [
  { label: "stats.images_processed", value: "10M+", icon: ImageIcon },
  { label: "stats.happy_users", value: "500K+", icon: Users },
  { label: "stats.processing_time", value: "<5s", icon: Clock },
  { label: "stats.success_rate", value: "99.9%", icon: CheckCircle },
]

const departments = [
  { value: "general", label: "contact.general_inquiry" },
  { value: "sales", label: "contact.sales_products" },
  { value: "support", label: "contact.technical_support" },
  { value: "partnership", label: "contact.partnerships" },
  { value: "press", label: "contact.press_media" },
]

export default function HomePage() {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isSubscribing, setIsSubscribing] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: t("contact.message_sent"),
        description: t("contact.response_soon"),
      })
      setFormData({
        name: "",
        email: "",
        department: "",
        subject: "",
        message: "",
      })
    }, 2000)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return

    setIsSubscribing(true)

    // Simulate newsletter subscription
    setTimeout(() => {
      setIsSubscribing(false)
      toast({
        title: t("footer.newsletter_success"),
        description: t("footer.newsletter_success_desc"),
      })
      setNewsletterEmail("")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#d03232]/10 via-transparent to-[#d03232]/5" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge className="bg-[#d03232]/10 text-white border border-[#d03232]/20 px-4 py-2 mb-6">
              ✨ {t("hero.new_ai_tools")}
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {t("hero.transform_your")} <span className="text-[#d03232]">{t("hero.media")}</span>
              <br />
              {t("hero.instantly")}
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{t("hero.description")}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white text-lg px-8 py-3 shadow-lg shadow-[#d03232]/20"
              >
                <Link href="/tools">
                  {t("hero.start_editing")} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="text-lg px-8 py-3 border-gray-600 text-white hover:bg-gray-900 bg-transparent"
              >
                <Link href="/pricing">{t("hero.view_pricing")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-[#d03232] mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{t(stat.label)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("tools.powerful")} <span className="text-[#d03232]">{t("tools.tools")}</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("tools.subtitle")}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={tool.href}>
                  <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl hover:shadow-2xl hover:border-gray-700 transition-all duration-300 h-full cursor-pointer group">
                    <CardHeader className="text-center pb-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#d03232]/20">
                          <tool.icon className="w-8 h-8 text-white" />
                        </div>
                        {tool.popular && (
                          <Badge className="absolute -top-2 -right-2 bg-[#d03232] text-white text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            {t("tools.popular")}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-white text-lg">{t(tool.name)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-400 text-center">{t(tool.description)}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("features.why_choose")} <span className="text-[#d03232]">Pixel</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("features.built_for_professionals")}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#d03232]/20">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{t(feature.title)}</h3>
                <p className="text-gray-300 leading-relaxed">{t(feature.description)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t("footer.newsletter")}</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">{t("footer.newsletter_desc")}</p>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232] flex-1"
              />
              <Button
                type="submit"
                disabled={isSubscribing}
                className="bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white font-medium px-6 shadow-lg shadow-[#d03232]/20"
              >
                {isSubscribing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    {t("footer.subscribing")}
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    {t("footer.subscribe")}
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d03232]/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t("cta.ready_to_start")}</h2>
            <p className="text-xl text-gray-300 mb-8">{t("cta.join_thousands")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                className="bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white text-lg px-8 py-3 shadow-lg shadow-[#d03232]/20"
              >
                <Link href="/tools">
                  {t("cta.try_tools_now")} <Zap className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="text-lg px-8 py-3 border-gray-600 text-white hover:bg-gray-900 bg-transparent"
              >
                <Link href="/signup">{t("cta.create_account")}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
