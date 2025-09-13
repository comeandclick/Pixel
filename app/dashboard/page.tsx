"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Settings, Crown, ImageIcon, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const recentActivity = [
  { action: "Background removed from image", time: "2 hours ago", icon: ImageIcon },
  { action: "Image compressed", time: "1 day ago", icon: TrendingUp },
  { action: "Format converted to PNG", time: "3 days ago", icon: Zap },
]

const quickActions = [
  { name: "Remove Background", href: "/tools/background-removal", icon: ImageIcon, popular: true },
  { name: "Compress Image", href: "/tools/image-compressor", icon: TrendingUp, popular: true },
  { name: "Convert Format", href: "/tools/format-converter", icon: Zap, popular: false },
]

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d03232] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
              <p className="text-gray-300">Ready to transform your media?</p>
            </div>
            <div className="flex items-center gap-3">
              {user.isPremium && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-3 py-1">
                  <Crown className="w-4 h-4 mr-1" />
                  Premium
                </Badge>
              )}
              <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-900 bg-transparent">
                <Link href="/profile">
                  <Settings className="w-4 h-4 mr-2" />
                  Profile Settings
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                      <Link key={action.name} href={action.href}>
                        <div className="group p-4 rounded-lg border border-gray-700 hover:border-[#d03232]/50 transition-all duration-300 cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <action.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-white font-medium">{action.name}</h3>
                              {action.popular && (
                                <Badge className="bg-[#d03232]/20 text-[#d03232] text-xs mt-1">Popular</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                      >
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                          <activity.icon className="w-4 h-4 text-[#d03232]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-sm">{activity.action}</p>
                          <p className="text-gray-400 text-xs">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Account Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Plan</span>
                    <Badge
                      className={
                        user.isPremium
                          ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
                          : "bg-gray-700 text-gray-300"
                      }
                    >
                      {user.isPremium ? "Premium" : "Free"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Images processed</span>
                    <span className="text-white">127</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Storage used</span>
                    <span className="text-white">2.4 GB</span>
                  </div>
                  {!user.isPremium && (
                    <Button className="w-full bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white mt-4">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Usage Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white">This Month</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Background Removal</span>
                      <span className="text-white">45</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-[#d03232] h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Image Compression</span>
                      <span className="text-white">32</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-[#d03232] h-2 rounded-full" style={{ width: "53%" }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Format Conversion</span>
                      <span className="text-white">18</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div className="bg-[#d03232] h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
