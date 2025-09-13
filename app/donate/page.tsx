"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, Coffee, Crown, Gift, Users, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"

const donationAmounts = [
  { amount: 5, icon: Coffee, label: "Buy us a coffee", description: "Support our daily work" },
  { amount: 15, icon: Heart, label: "Show some love", description: "Help us improve features" },
  { amount: 50, icon: Crown, label: "Premium supporter", description: "Unlock new possibilities" },
  { amount: 100, icon: Gift, label: "Generous patron", description: "Make a real difference" },
]

const impactStats = [
  { icon: Users, value: "50K+", label: "Users helped" },
  { icon: Zap, value: "1M+", label: "Images processed" },
  { icon: Heart, value: "99%", label: "Satisfaction rate" },
  { icon: Crown, value: "24/7", label: "Free access" },
]

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(15)
  const [customAmount, setCustomAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const { t } = useLanguage()
  const { toast } = useToast()

  const handleDonate = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: t("donate.thank_you"),
        description: "Your support means the world to us!",
      })
    }, 2000)
  }

  const finalAmount = customAmount ? Number.parseFloat(customAmount) : selectedAmount

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
            <Heart className="w-4 h-4 mr-2" />
            {t("donate.title")}
          </Badge>

          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">{t("donate.title")}</h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">{t("donate.description")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Donation Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Make a Donation</CardTitle>
                <p className="text-gray-400">Choose an amount that feels right for you</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Preset Amounts */}
                <div className="grid grid-cols-2 gap-4">
                  {donationAmounts.map((donation) => (
                    <div
                      key={donation.amount}
                      onClick={() => {
                        setSelectedAmount(donation.amount)
                        setCustomAmount("")
                      }}
                      className={`p-4 rounded-lg cursor-pointer border transition-all ${
                        selectedAmount === donation.amount && !customAmount
                          ? "border-[#d03232] bg-[#d03232]/10"
                          : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <donation.icon className="w-5 h-5 text-[#d03232]" />
                        <span className="font-semibold text-white">${donation.amount}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-300 mb-1">{donation.label}</p>
                      <p className="text-xs text-gray-400">{donation.description}</p>
                    </div>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-8 bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                      min="1"
                      step="0.01"
                    />
                  </div>
                </div>

                {/* Donation Summary */}
                <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Donation Amount:</span>
                    <span className="text-2xl font-bold text-[#d03232]">${finalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Donate Button */}
                <Button
                  onClick={handleDonate}
                  disabled={isProcessing || finalAmount <= 0}
                  className="w-full bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg shadow-[#d03232]/20"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2" />
                      {t("donate.donate")} ${finalAmount.toFixed(2)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Secure payment powered by Stripe • Your donation is processed safely
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Impact & Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Impact Stats */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Your Impact</CardTitle>
                <p className="text-gray-400">See how your support helps our community</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {impactStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-[#d03232]/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <stat.icon className="w-6 h-6 text-[#d03232]" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Why Donate */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Why Your Support Matters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#d03232] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Keep Tools Free</h4>
                    <p className="text-sm text-gray-400">
                      Your donations help us maintain free access to essential tools for everyone.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#d03232] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Improve Performance</h4>
                    <p className="text-sm text-gray-400">
                      Fund better servers and infrastructure for faster processing times.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#d03232] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Add New Features</h4>
                    <p className="text-sm text-gray-400">
                      Support development of new AI models and editing capabilities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#d03232] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Support the Team</h4>
                    <p className="text-sm text-gray-400">
                      Help our small team continue building amazing tools for creators.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alternative Support */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">Other Ways to Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Share with friends
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join our community
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
