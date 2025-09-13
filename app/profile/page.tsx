"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Crown, Shield, Bell, Globe, Save, Camera, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  website: string
  company: string
  jobTitle: string
  birthDate: string
  timezone: string
  language: string
  emailNotifications: boolean
  marketingEmails: boolean
  securityAlerts: boolean
}

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const { t, language, setLanguage } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()

  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    website: "",
    company: "",
    jobTitle: "",
    birthDate: "",
    timezone: "America/Los_Angeles",
    language: "en",
    emailNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    } else if (user) {
      // Load user profile data
      const savedProfile = localStorage.getItem(`profile_${user.id}`)
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile))
      } else {
        // Initialize with user data
        setProfile((prev) => ({
          ...prev,
          name: user.name,
          email: user.email,
          language: language,
        }))
      }
    }
  }, [user, loading, router, language])

  const handleInputChange = (field: keyof UserProfile, value: string | boolean) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!user) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(profile))

      // Update language if changed
      if (profile.language !== language) {
        setLanguage(profile.language)
      }

      setIsLoading(false)
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      })
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#d03232] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ]

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
          <div className="flex items-center gap-4 mb-6">
            <Button asChild variant="ghost" className="text-gray-300 hover:text-white">
              <Link href="/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-gray-800 hover:bg-gray-700"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
                {user.isPremium && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black">
                    <Crown className="w-4 h-4 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-gray-300">{profile.email}</p>
              {profile.jobTitle && profile.company && (
                <p className="text-gray-400 text-sm">
                  {profile.jobTitle} at {profile.company}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? "bg-[#d03232]/20 text-[#d03232] border-r-2 border-[#d03232]"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                      }`}
                    >
                      <tab.icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">{tabs.find((tab) => tab.id === activeTab)?.label}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeTab === "personal" && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-white">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          value={profile.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location" className="text-white">
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={profile.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                          placeholder="San Francisco, CA"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-white">
                        Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232] min-h-[100px]"
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="website" className="text-white">
                          Website
                        </Label>
                        <Input
                          id="website"
                          value={profile.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                          placeholder="https://yourwebsite.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthDate" className="text-white">
                          Birth Date
                        </Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={profile.birthDate}
                          onChange={(e) => handleInputChange("birthDate", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company" className="text-white">
                          Company
                        </Label>
                        <Input
                          id="company"
                          value={profile.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <Label htmlFor="jobTitle" className="text-white">
                          Job Title
                        </Label>
                        <Input
                          id="jobTitle"
                          value={profile.jobTitle}
                          onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                          placeholder="Your Job Title"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "preferences" && (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="language" className="text-white">
                          Language
                        </Label>
                        <Select
                          value={profile.language}
                          onValueChange={(value) => handleInputChange("language", value)}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-gray-800">
                            <SelectItem value="en" className="text-white hover:bg-gray-800">
                              English
                            </SelectItem>
                            <SelectItem value="fr" className="text-white hover:bg-gray-800">
                              Français
                            </SelectItem>
                            <SelectItem value="es" className="text-white hover:bg-gray-800">
                              Español
                            </SelectItem>
                            <SelectItem value="de" className="text-white hover:bg-gray-800">
                              Deutsch
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="timezone" className="text-white">
                          Timezone
                        </Label>
                        <Select
                          value={profile.timezone}
                          onValueChange={(value) => handleInputChange("timezone", value)}
                        >
                          <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-gray-800">
                            <SelectItem value="America/Los_Angeles" className="text-white hover:bg-gray-800">
                              Pacific Time
                            </SelectItem>
                            <SelectItem value="America/New_York" className="text-white hover:bg-gray-800">
                              Eastern Time
                            </SelectItem>
                            <SelectItem value="Europe/London" className="text-white hover:bg-gray-800">
                              GMT
                            </SelectItem>
                            <SelectItem value="Europe/Paris" className="text-white hover:bg-gray-800">
                              Central European Time
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Email Notifications</h4>
                          <p className="text-gray-400 text-sm">Receive notifications about your account activity</p>
                        </div>
                        <Switch
                          checked={profile.emailNotifications}
                          onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
                        />
                      </div>

                      <Separator className="bg-gray-700" />

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Marketing Emails</h4>
                          <p className="text-gray-400 text-sm">Receive updates about new features and promotions</p>
                        </div>
                        <Switch
                          checked={profile.marketingEmails}
                          onCheckedChange={(checked) => handleInputChange("marketingEmails", checked)}
                        />
                      </div>

                      <Separator className="bg-gray-700" />

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">Security Alerts</h4>
                          <p className="text-gray-400 text-sm">Get notified about important security events</p>
                        </div>
                        <Switch
                          checked={profile.securityAlerts}
                          onCheckedChange={(checked) => handleInputChange("securityAlerts", checked)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "security" && (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Password</h4>
                        <p className="text-gray-400 text-sm mb-3">Last changed 3 months ago</p>
                        <Button
                          variant="outline"
                          className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                        >
                          Change Password
                        </Button>
                      </div>

                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Two-Factor Authentication</h4>
                        <p className="text-gray-400 text-sm mb-3">Add an extra layer of security to your account</p>
                        <Button
                          variant="outline"
                          className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                        >
                          Enable 2FA
                        </Button>
                      </div>

                      <div className="p-4 bg-gray-800/50 rounded-lg">
                        <h4 className="text-white font-medium mb-2">Active Sessions</h4>
                        <p className="text-gray-400 text-sm mb-3">Manage your active sessions across devices</p>
                        <Button
                          variant="outline"
                          className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                        >
                          View Sessions
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-6 border-t border-gray-700">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white px-8"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
