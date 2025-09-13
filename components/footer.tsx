"use client"

import type React from "react"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Send } from "lucide-react"
import { useState } from "react"

export function Footer() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", formData)
  }

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <section id="contact-section" className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Contact Us</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">contact@pixel-tools.com</span>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Have questions about our tools or need support? We're here to help you get the most out of Pixel.
                </p>
              </div>
            </div>

            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <Textarea
                    placeholder="Your message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                  />
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">{t("footer.company")}</h3>
            <p className="text-muted-foreground mb-4">{t("footer.description")}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t("nav.tools")}</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/tools/background-removal" className="hover:text-primary transition-colors">
                  {t("tools.background_removal")}
                </Link>
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:text-primary transition-colors">
                  {t("tools.image_compressor")}
                </Link>
              </li>
              <li>
                <Link href="/tools/image-resizer" className="hover:text-primary transition-colors">
                  {t("tools.image_resizer")}
                </Link>
              </li>
              <li>
                <Link href="/tools/format-converter" className="hover:text-primary transition-colors">
                  {t("tools.format_converter")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex justify-between items-center">
          <Link href="https://www.comeandclickagency.com" target="_blank" className="agency-link text-sm">
            by Come & Click Agency
          </Link>

          <p className="text-center text-muted-foreground text-sm">
            &copy; 2024 {t("footer.company")}. {t("footer.rights")}
          </p>

          <Link href="https://www.comeandclickagency.com" target="_blank" className="agency-link text-sm">
            by Come & Click Agency
          </Link>
        </div>
      </div>
    </footer>
  )
}
