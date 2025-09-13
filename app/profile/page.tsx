"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Camera, Lock, Bell, Globe, Shield, Trash2, Save, Settings, Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"

const defaultAvatars = [
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
  "/placeholder.svg?height=100&width=100",
]

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { t, language, setLanguage } = useLanguage()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    avatar: "/placeholder.svg?height=120&width=120",
    location: "",
    website: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    publicProfile: true,
    showEmail: false,
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: t("common.success"),
        description: "Profile updated successfully!",
      })
    }, 1000)
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: t("common.error"),
        description: "New passwords don't match",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      toast({
        title: t("common.success"),
        description: "Password updated successfully!",
      })
    }, 1000)
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          avatar: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const selectDefaultAvatar = (avatar: string) => {
    setProfileData((prev) => ({
      ...prev,
      avatar,
    }))
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Simulate account deletion
      logout()
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      })
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Not Logged In</h2>
            <p className="text-gray-400 mb-6">Please log in to access your profile</p>
            <Button asChild className="bg-red-500 hover:bg-red-600">
              <a href="/login">Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge className="bg-[#d03232]/10 text-[#d03232] border border-[#d03232]/20 px-4 py-2 mb-6">
            <Settings className="w-4 h-4 mr-2" />
            {t("profile.title")}
          </Badge>

          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">{t("profile.edit_profile")}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Manage your account settings and preferences</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border border-gray-800">
              <TabsTrigger value="profile" className="data-[state=active]:bg-[#d03232] data-[state=active]:text-white">
                Profile
              </TabsTrigger>
              <TabsTrigger value="account" className="data-[state=active]:bg-[#d03232] data-[state=active]:text-white">
                Account
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="data-[state=active]:bg-[#d03232] data-[state=active]:text-white"
              >
                {t("profile.preferences")}
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-[#d03232] data-[state=active]:text-white">
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      {/* Avatar Section */}
                      <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                          <img
                            src={profileData.avatar || "/placeholder.svg"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-700"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0 bg-[#d03232] hover:bg-[#b82828]"
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        </div>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          className="hidden"
                        />

                        <div className="text-center">
                          <p className="text-sm text-gray-400 mb-3">{t("profile.upload_image")} or choose a default:</p>
                          <div className="flex gap-2 flex-wrap justify-center">
                            {defaultAvatars.map((avatar, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => selectDefaultAvatar(avatar)}
                                className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-700 hover:border-[#d03232] transition-colors"
                              >
                                <img
                                  src={avatar || "/placeholder.svg"}
                                  alt={`Avatar ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-gray-700" />

                      {/* Profile Fields */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name" className="text-white">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
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
                            value={profileData.email}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                            className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                          />
                        </div>

                        <div>
                          <Label htmlFor="location" className="text-white">
                            Location
                          </Label>
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, location: e.target.value }))}
                            className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                            placeholder="City, Country"
                          />
                        </div>

                        <div>
                          <Label htmlFor="website" className="text-white">
                            Website
                          </Label>
                          <Input
                            id="website"
                            value={profileData.website}
                            onChange={(e) => setProfileData((prev) => ({ ...prev, website: e.target.value }))}
                            className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232]"
                            placeholder="https://yourwebsite.com"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio" className="text-white">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                          className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232] min-h-[100px]"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            {t("profile.save_changes")}
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Password Change */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Change Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword" className="text-white">
                          Current Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showPasswords.current ? "text" : "password"}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                            className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232] pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                          >
                            {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="newPassword" className="text-white">
                          New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showPasswords.new ? "text" : "password"}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                            className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232] pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                          >
                            {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword" className="text-white">
                          Confirm New Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showPasswords.confirm ? "text" : "password"}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                            className="bg-gray-800 border-gray-700 text-white focus:border-[#d03232] pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
                            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
                          >
                            {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Updating...
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 mr-2" />
                            Update Password
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Language Settings */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Language Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-white">Preferred Language</Label>
                        <div className="grid grid-cols-2 gap-3 mt-2">
                          {[
                            { code: "en", name: "English" },
                            { code: "fr", name: "Français" },
                            { code: "es", name: "Español" },
                            { code: "de", name: "Deutsch" },
                          ].map((lang) => (
                            <Button
                              key={lang.code}
                              variant={language === lang.code ? "default" : "outline"}
                              onClick={() => setLanguage(lang.code as any)}
                              className={
                                language === lang.code
                                  ? "bg-[#d03232] hover:bg-[#b82828] text-white"
                                  : "border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                              }
                            >
                              {lang.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Email Notifications</Label>
                        <p className="text-sm text-gray-400">Receive updates via email</p>
                      </div>
                      <Switch
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) =>
                          setPreferences((prev) => ({ ...prev, emailNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Push Notifications</Label>
                        <p className="text-sm text-gray-400">Receive browser notifications</p>
                      </div>
                      <Switch
                        checked={preferences.pushNotifications}
                        onCheckedChange={(checked) =>
                          setPreferences((prev) => ({ ...prev, pushNotifications: checked }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Marketing Emails</Label>
                        <p className="text-sm text-gray-400">Receive promotional content</p>
                      </div>
                      <Switch
                        checked={preferences.marketingEmails}
                        onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, marketingEmails: checked }))}
                      />
                    </div>

                    <Separator className="bg-gray-700" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Public Profile</Label>
                        <p className="text-sm text-gray-400">Make your profile visible to others</p>
                      </div>
                      <Switch
                        checked={preferences.publicProfile}
                        onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, publicProfile: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-white">Show Email</Label>
                        <p className="text-sm text-gray-400">Display email on public profile</p>
                      </div>
                      <Switch
                        checked={preferences.showEmail}
                        onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, showEmail: checked }))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Account Security */}
                <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Account Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-800 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-400">Add an extra layer of security</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-green-600 text-green-400 hover:bg-green-900/20 bg-transparent"
                      >
                        Enable 2FA
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-900/20 border border-blue-800 rounded-lg">
                      <div>
                        <p className="text-white font-medium">Login Sessions</p>
                        <p className="text-sm text-gray-400">Manage your active sessions</p>
                      </div>
                      <Button
                        variant="outline"
                        className="border-blue-600 text-blue-400 hover:bg-blue-900/20 bg-transparent"
                      >
                        View Sessions
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="bg-red-900/20 backdrop-blur-sm border border-red-800 shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-red-400 flex items-center gap-2">
                      <Trash2 className="w-5 h-5" />
                      Danger Zone
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg">
                      <h4 className="text-white font-medium mb-2">Delete Account</h4>
                      <p className="text-sm text-gray-300 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button
                        onClick={handleDeleteAccount}
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
