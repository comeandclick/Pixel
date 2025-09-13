"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold text-white mb-4">{t("privacy.title")}</h1>
            <p className="text-gray-300">{t("privacy.last_updated")}</p>
          </div>

          <div className="space-y-8">
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Introduction</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  At Pixel, we take your privacy seriously. This Privacy Policy explains how we collect, use, and
                  protect your personal information when you use our media editing services.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Information You Provide</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Account information (name, email, password)</li>
                    <li>Billing information for premium subscriptions</li>
                    <li>Communications with our support team</li>
                    <li>Files you upload for processing (processed locally, not stored)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Information Collected Automatically</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>IP address and location data</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and features used</li>
                    <li>Device information and operating system</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Provide and improve our media editing services</li>
                  <li>Manage your account and subscriptions</li>
                  <li>Provide customer support</li>
                  <li>Ensure security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                  <li>Send marketing communications (with consent)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Data Security</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Your Rights</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Restrict processing of your information</li>
                  <li>Data portability</li>
                  <li>Object to processing</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>If you have questions about this Privacy Policy, contact us at:</p>
                <p className="text-[#d03232]">privacy@pixel.com</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
