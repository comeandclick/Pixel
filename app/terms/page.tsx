"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

export default function TermsPage() {
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
            <h1 className="text-4xl font-bold text-white mb-4">{t("terms.title")}</h1>
            <p className="text-gray-300">{t("terms.last_updated")}</p>
          </div>

          <div className="space-y-8">
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  By accessing and using Pixel's services, you accept and agree to be bound by these Terms of Service.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Description of Services</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Pixel provides AI-powered media editing tools including background removal, format conversion, image
                  compression, and other media processing services.
                </p>
                <p>We strive to maintain service availability but do not guarantee uninterrupted access.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">User Accounts</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Registration</h3>
                  <p>
                    You may need to create an account to access certain features. You are responsible for maintaining
                    account security.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Account Responsibility</h3>
                  <p>
                    You are responsible for all activities under your account and must keep your login credentials
                    secure.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Acceptable Use</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>You agree not to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Use our services for illegal purposes</li>
                  <li>Upload harmful, offensive, or inappropriate content</li>
                  <li>Send spam or unsolicited communications</li>
                  <li>Interfere with service operation</li>
                  <li>Reverse engineer our software</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Payment Terms</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>Pricing for premium features is displayed on our website and may change with notice.</p>
                <p>Premium subscriptions are billed in advance. All fees are non-refundable unless required by law.</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>For questions about these terms, contact us at:</p>
                <p className="text-[#d03232]">legal@pixel.com</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
