"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

export default function CookiesPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">{t("cookies.title")}</h1>
            <p className="text-gray-300">{t("cookies.last_updated")}</p>
          </div>

          <div className="space-y-8">
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">What Are Cookies</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Cookies are small text files stored on your device when you visit our website. They help us provide a
                  better user experience.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">How We Use Cookies</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>We use different types of cookies:</p>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Necessary Cookies</h3>
                  <p>Essential for the website to function properly. Cannot be disabled.</p>
                  <p className="text-sm text-gray-400">Examples: Authentication, security, basic functionality</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Analytics Cookies</h3>
                  <p>Help us understand how visitors use our website to improve performance.</p>
                  <p className="text-sm text-gray-400">
                    Examples: Google Analytics, usage statistics, performance monitoring
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Functional Cookies</h3>
                  <p>Remember your preferences and settings for a personalized experience.</p>
                  <p className="text-sm text-gray-400">
                    Examples: Language preferences, theme settings, user interface customization
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Your Choices</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>You have control over cookies:</p>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Browser Settings</h3>
                  <p>
                    You can control cookies through your browser settings. Note that disabling cookies may affect
                    website functionality.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>If you have questions about our use of cookies, contact us at:</p>
                <p className="text-[#d03232]">cookies@pixel.com</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
