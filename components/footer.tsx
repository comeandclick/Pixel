"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Zap, Github, Twitter, Instagram, Youtube, Mail, Heart } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const footerLinks = {
  tools: [
    { name: "Background Removal", href: "/tools/background-removal" },
    { name: "Format Converter", href: "/tools/format-converter" },
    { name: "Image Compressor", href: "/tools/image-compressor" },
    { name: "Watermark Remover", href: "/tools/watermark-remover" },
  ],
  company: [
    { name: "nav.pricing", href: "/pricing" },
    { name: "nav.contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "API Documentation", href: "/docs" },
    { name: "Status", href: "/status" },
    { name: "footer.support", href: "/support" },
  ],
  legal: [
    { name: "footer.privacy", href: "/privacy" },
    { name: "footer.terms", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
    { name: "Legal", href: "/legal" },
  ],
}

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/pixel" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/pixel" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/pixel" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com/pixel" },
]

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#d03232]/5 rounded-full blur-3xl -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#d03232]/5 rounded-full blur-3xl translate-x-48 translate-y-48" />

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h3 className="text-3xl font-bold text-white mb-4">{t("footer.newsletter")}</h3>
              <p className="text-lg text-gray-300 mb-8">{t("footer.newsletter_desc")}</p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input type="email" placeholder="your@email.com" className="input-dark" />
                <Button className="btn-primary">
                  <Mail className="w-4 h-4 mr-2" />
                  {t("footer.subscribe")}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">Pixel</span>
              </Link>

              <p className="text-gray-300 leading-relaxed max-w-sm">{t("footer.description")}</p>

              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-[#d03232]/20 border border-gray-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5 text-gray-300 hover:text-[#d03232]" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h4 className="text-lg font-semibold text-white capitalize">
                  {category === "tools" && "Tools"}
                  {category === "company" && "Company"}
                  {category === "support" && "Support"}
                  {category === "legal" && "Legal"}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                      >
                        {link.name.startsWith("nav.") || link.name.startsWith("footer.") ? t(link.name) : link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <span>{t("footer.copyright")}</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center space-x-1">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-[#d03232] fill-current" />
                  <span>for creators</span>
                </span>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  {t("footer.privacy")}
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  {t("footer.terms")}
                </Link>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
