"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Zap, Star } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "0",
    description: "Perfect for getting started",
    features: [
      "5 images per day",
      "Standard quality (720p)",
      "Basic tools access",
      "Community support",
      "Watermark on results",
    ],
    limitations: ["Limited daily usage", "Standard quality only", "Watermarked results"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Premium",
    price: "9.99",
    description: "For professionals and power users",
    features: [
      "Unlimited images",
      "HD quality (1080p)",
      "All tools access",
      "Priority support",
      "No watermarks",
      "Batch processing",
      "API access",
      "Advanced AI models",
    ],
    limitations: [],
    cta: "Upgrade Now",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and businesses",
    features: [
      "Everything in Premium",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "White-label options",
      "Team management",
      "Advanced analytics",
      "Custom AI training",
    ],
    limitations: [],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function PricingPage() {
  const { t } = useLanguage()
  const { user } = useAuth()

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
          <Badge className="bg-[#d03232]/10 text-[#d03232] border border-[#d03232]/20 px-4 py-2 mb-6">
            <Crown className="w-4 h-4 mr-2" />
            {t("pricing.title")}
          </Badge>

          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">{t("pricing.title")}</h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{t("pricing.subtitle")}</p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-[#d03232] to-[#b82828] text-white px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`h-full bg-gray-900/50 backdrop-blur-sm border shadow-xl transition-all duration-300 hover:shadow-2xl ${
                  plan.popular ? "border-[#d03232] shadow-[#d03232]/20" : "border-gray-800 hover:border-gray-700"
                }`}
              >
                <CardHeader className="text-center pb-8">
                  <div className="flex items-center justify-center mb-4">
                    {plan.name === "Free" && <Zap className="w-8 h-8 text-gray-400" />}
                    {plan.name === "Premium" && <Crown className="w-8 h-8 text-[#d03232]" />}
                    {plan.name === "Enterprise" && <Star className="w-8 h-8 text-yellow-500" />}
                  </div>

                  <CardTitle className="text-2xl font-bold text-white mb-2">{plan.name}</CardTitle>

                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">
                      {plan.price === "Custom" ? "" : "$"}
                      {plan.price}
                    </span>
                    {plan.price !== "Custom" && plan.price !== "0" && (
                      <span className="text-gray-400">/{t("pricing.month")}</span>
                    )}
                  </div>

                  <p className="text-gray-400">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    asChild
                    className={`w-full py-3 font-medium transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white shadow-lg shadow-[#d03232]/20"
                        : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                    }`}
                  >
                    <Link href={plan.name === "Enterprise" ? "/contact" : user ? "/dashboard" : "/signup"}>
                      {plan.cta}
                    </Link>
                  </Button>

                  {plan.name === "Premium" && !user && (
                    <p className="text-xs text-gray-500 text-center">7-day free trial • Cancel anytime</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Everything you need to know about our pricing</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-400 text-sm">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of
                  your billing period.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-2">Is there a free trial?</h3>
                <p className="text-gray-400 text-sm">
                  Yes, Premium comes with a 7-day free trial. No credit card required to start.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-400 text-sm">
                  We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <CardContent className="p-6">
                <h3 className="font-semibold text-white mb-2">Do you offer refunds?</h3>
                <p className="text-gray-400 text-sm">Yes, we offer a 30-day money-back guarantee for all paid plans.</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Card className="bg-gradient-to-r from-[#d03232]/10 to-[#b82828]/10 border border-[#d03232]/20 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your media?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of creators and professionals who trust Pixel for their media editing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white px-8 py-3 font-medium shadow-lg shadow-[#d03232]/20"
                >
                  <Link href="/signup">Start Free Trial</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800 bg-transparent px-8 py-3"
                >
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
