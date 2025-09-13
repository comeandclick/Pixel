"use client"

import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { ImageIcon, Scissors, Maximize, RefreshCw, Video, Droplets, User, Settings, History } from "lucide-react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d03232] mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const quickActions = [
    {
      title: t("tools.background_removal"),
      icon: Scissors,
      href: "/tools/background-removal",
      color: "text-blue-600",
    },
    {
      title: t("tools.image_compressor"),
      icon: ImageIcon,
      href: "/tools/image-compressor",
      color: "text-green-600",
    },
    {
      title: t("tools.image_resizer"),
      icon: Maximize,
      href: "/tools/image-resizer",
      color: "text-purple-600",
    },
    {
      title: t("tools.format_converter"),
      icon: RefreshCw,
      href: "/tools/format-converter",
      color: "text-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Ready to edit some images today?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <Link href={action.href}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <action.icon className={`h-5 w-5 ${action.color}`} />
                        </div>
                        <CardTitle className="text-lg">{action.title}</CardTitle>
                      </div>
                    </CardHeader>
                  </Link>
                </Card>
              ))}
            </div>
          </div>

          {/* Account Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="text-base">{user.name}</CardTitle>
                      <CardDescription className="text-sm">{user.email}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <History className="h-5 w-5 text-gray-600" />
                    <CardTitle className="text-base">Recent Activity</CardTitle>
                  </div>
                </CardHeader>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5 text-gray-600" />
                    <CardTitle className="text-base">Settings</CardTitle>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>

        {/* All Tools */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">All Tools</h2>
            <Button variant="outline" asChild>
              <Link href="/tools">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Scissors, title: t("tools.background_removal"), href: "/tools/background-removal" },
              { icon: ImageIcon, title: t("tools.image_compressor"), href: "/tools/image-compressor" },
              { icon: Maximize, title: t("tools.image_resizer"), href: "/tools/image-resizer" },
              { icon: RefreshCw, title: t("tools.format_converter"), href: "/tools/format-converter" },
              { icon: Video, title: t("tools.video_compressor"), href: "/tools/video-compressor" },
              { icon: Droplets, title: t("tools.watermark_remover"), href: "/tools/watermark-remover" },
            ].map((tool, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <Link href={tool.href}>
                  <CardContent className="p-4 text-center">
                    <tool.icon className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{tool.title}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
