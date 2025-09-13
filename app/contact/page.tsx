"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, MessageCircle, Headphones } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"

const contactMethods = [
  {
    icon: Mail,
    title: "contact.email",
    description: "contact.email_desc",
    contact: "contact@pixel.com",
    action: "mailto:contact@pixel.com",
  },
  {
    icon: Phone,
    title: "contact.phone",
    description: "contact.phone_desc",
    contact: "+1 (555) 123-4567",
    action: "tel:+15551234567",
  },
  {
    icon: MessageCircle,
    title: "contact.live_chat",
    description: "contact.live_chat_desc",
    contact: "contact.available_hours",
    action: "#",
  },
  {
    icon: MapPin,
    title: "contact.address",
    description: "contact.address_desc",
    contact: "123 Tech Street, San Francisco, CA 94105",
    action: "https://maps.google.com",
  },
]

const departments = [
  { value: "general", label: "contact.general_inquiry" },
  { value: "sales", label: "contact.sales_products" },
  { value: "support", label: "contact.technical_support" },
  { value: "partnership", label: "contact.partnerships" },
  { value: "press", label: "contact.press_media" },
]

export default function ContactPage() {
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

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="bg-[#d03232]/10 text-[#d03232] border border-[#d03232]/20 px-4 py-2 mb-6">
              <Headphones className="w-4 h-4 mr-2" />
              {t("contact.customer_support")}
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">{t("contact.title")}</h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{t("contact.subtitle")}</p>
          </motion.div>

          {/* Contact Methods */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#d03232]/20">
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{t(method.title)}</h3>
                    <p className="text-gray-400 text-sm mb-3">{t(method.description)}</p>
                    <p className="text-[#d03232] font-medium text-sm">{method.contact}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{t("contact.send_message")}</CardTitle>
                  <p className="text-gray-400">{t("contact.form_description")}</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-white">
                          {t("contact.full_name")} *
                        </Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                          placeholder={t("contact.your_name")}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="department" className="text-white">
                          {t("contact.department")}
                        </Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => handleInputChange("department", value)}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue placeholder={t("contact.choose_department")} />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-gray-800">
                            {departments.map((dept) => (
                              <SelectItem key={dept.value} value={dept.value} className="text-white hover:bg-gray-800">
                                {t(dept.label)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="subject" className="text-white">
                          {t("contact.subject")} *
                        </Label>
                        <Input
                          id="subject"
                          required
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                          placeholder={t("contact.message_subject")}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white">
                        {t("contact.message")} *
                      </Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232] min-h-[120px]"
                        placeholder={t("contact.your_message")}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white font-medium py-3 shadow-lg shadow-[#d03232]/20"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          {t("contact.sending")}
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          {t("contact.send")}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">{t("contact.office_hours")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t("contact.monday_friday")}</span>
                    <span className="text-white">9:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t("contact.saturday")}</span>
                    <span className="text-white">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t("contact.sunday")}</span>
                    <span className="text-white">{t("contact.closed")}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">{t("contact.response_times")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t("contact.general_inquiries")}</span>
                    <span className="text-white">{t("contact.within_24h")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t("contact.technical_support")}</span>
                    <span className="text-white">{t("contact.within_4h")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{t("contact.urgent_issues")}</span>
                    <span className="text-white">{t("contact.within_1h")}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
