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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // TODO: Add web3forms integration with API key
      console.log("Contact form submitted:", formData)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="glass-effect border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 gradient-text">{t("newsletter.title")}</h2>
            <p className="text-muted-foreground mb-8">{t("newsletter.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder={t("newsletter.placeholder")} className="glass-effect" />
              <Button className="bg-primary hover:bg-primary/90">{t("newsletter.subscribe")}</Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact-section" className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 gradient-text">{t("contact.title")}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{t("contact.subtitle")}</p>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">contact@pixel-tools.com</span>
              </div>
            </div>

            <Card className="gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5" />
                  {t("contact.send")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder={t("contact.name")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="glass-effect"
                  />
                  <Input
                    type="email"
                    placeholder={t("contact.email")}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="glass-effect"
                  />
                  <Textarea
                    placeholder={t("contact.message")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    required
                    className="glass-effect"
                  />
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                    {isSubmitting ? t("common.loading") : t("contact.send")}
                  </Button>
                  {submitStatus === "success" && <p className="text-green-400 text-sm">{t("contact.success")}</p>}
                  {submitStatus === "error" && <p className="text-red-400 text-sm">{t("contact.error")}</p>}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">{t("footer.company")}</h3>
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
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-primary transition-colors">
                  {t("footer.cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center text-muted-foreground text-sm">
            &copy; 2024 {t("footer.company")}. {t("footer.rights")}
          </p>

          <Link
            href="https://www.comeandclickagency.com"
            target="_blank"
            className="text-sm text-muted-foreground hover:text-blue-400 transition-colors duration-300"
          >
            {t("footer.made_by")}
          </Link>
        </div>
      </div>
    </footer>
  )
}
