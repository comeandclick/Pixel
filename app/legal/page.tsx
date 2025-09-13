"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scale } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function LegalPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="bg-[#d03232]/10 text-[#d03232] border border-[#d03232]/20 px-4 py-2 mb-6">
            <Scale className="w-4 h-4 mr-2" />
            Legal Information
          </Badge>

          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">Legal Information</h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">Last updated: December 2024</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
            <CardContent className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Company Information</h2>
                <div className="text-gray-300 space-y-2">
                  <p>
                    <strong>Company Name:</strong> Pixel Inc.
                  </p>
                  <p>
                    <strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105, USA
                  </p>
                  <p>
                    <strong>Registration Number:</strong> 123456789
                  </p>
                  <p>
                    <strong>Tax ID:</strong> US123456789
                  </p>
                  <p>
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                  <p>
                    <strong>Email:</strong> legal@pixel.com
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">CEO & Legal Representative</h2>
                <p className="text-gray-300">John Smith, Chief Executive Officer</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Hosting Information</h2>
                <div className="text-gray-300 space-y-2">
                  <p>
                    <strong>Hosting Provider:</strong> Vercel Inc.
                  </p>
                  <p>
                    <strong>Address:</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
                  </p>
                  <p>
                    <strong>Website:</strong> https://vercel.com
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                <p className="text-gray-300 leading-relaxed">
                  All content on this website, including but not limited to text, graphics, logos, images, and software,
                  is the property of Pixel Inc. and is protected by international copyright and trademark laws. All
                  rights are reserved.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Liability Disclaimer</h2>
                <p className="text-gray-300 leading-relaxed">
                  The information contained on this website is provided for general information purposes only. While we
                  strive to keep the information accurate and up-to-date, we make no representations or warranties of
                  any kind about the completeness, accuracy, reliability, or availability of the website or the
                  information contained on it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">External Links</h2>
                <p className="text-gray-300 leading-relaxed">
                  This website may contain links to external websites that are not provided or maintained by Pixel Inc.
                  We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these
                  external websites.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Applicable Law</h2>
                <p className="text-gray-300 leading-relaxed">
                  This website and its use are governed by the laws of the State of California, USA, without regard to
                  conflict of law principles. Any disputes arising from the use of this website shall be subject to the
                  exclusive jurisdiction of the courts in San Francisco, California.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <p className="text-gray-300 leading-relaxed">
                  For any legal inquiries or concerns, please contact us at:
                </p>
                <div className="text-gray-300 space-y-1 mt-2">
                  <p>• Email: legal@pixel.com</p>
                  <p>• Phone: +1 (555) 123-4567</p>
                  <p>• Mail: Pixel Inc., Legal Department, 123 Tech Street, San Francisco, CA 94105, USA</p>
                </div>
              </section>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
