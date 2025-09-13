"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, User, LogOut, Settings, Crown, Globe, Zap } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"

const navigation = [
  { name: "nav.home", href: "/" },
  { name: "nav.tools", href: "/tools" },
  { name: "nav.pricing", href: "/pricing" },
  { name: "nav.contact", href: "/contact" },
]

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-card shadow-2xl" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-xl flex items-center justify-center glow-red">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl lg:text-3xl font-bold text-white">Pixel</span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-[#d03232] ${
                  pathname === item.href ? "text-[#d03232]" : "text-white"
                }`}
              >
                {t(item.name)}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#d03232] rounded-full"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Selector */}
            <Select value={language} onValueChange={(value) => setLanguage(value)}>
              <SelectTrigger className="w-auto border-none bg-transparent text-white">
                <Globe className="w-4 h-4 mr-2 text-[#d03232]" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black border-gray-800">
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-gray-800">
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder.svg" alt={user.name} />
                      <AvatarFallback className="bg-[#d03232] text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {user.isPremium && <Crown className="absolute -top-1 -right-1 w-4 h-4 text-[#d03232]" />}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-black border-gray-800">
                  <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                    <Link href="/dashboard" className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-[#d03232]" />
                      {t("nav.dashboard")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4 text-[#d03232]" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  {!user.isPremium && (
                    <DropdownMenuItem asChild className="text-[#d03232] hover:bg-gray-800">
                      <Link href="/pricing" className="flex items-center">
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade to Premium
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout} className="flex items-center text-red-400 hover:bg-gray-800">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("nav.logout")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm" className="text-white hover:text-[#d03232]">
                  <Link href="/login">{t("nav.login")}</Link>
                </Button>
                <Button asChild className="btn-primary">
                  <Link href="/signup">{t("nav.signup")}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-black border-gray-800">
                <div className="flex flex-col space-y-6 mt-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold text-white">Pixel</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-lg font-medium transition-colors duration-200 py-2 border-b border-gray-800 ${
                          pathname === item.href ? "text-[#d03232]" : "text-white hover:text-[#d03232]"
                        }`}
                      >
                        {t(item.name)}
                      </Link>
                    ))}
                  </nav>

                  <div className="flex flex-col space-y-3 pt-6">
                    <Select value={language} onValueChange={(value) => setLanguage(value)}>
                      <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                        <Globe className="w-4 h-4 mr-2 text-[#d03232]" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-gray-800">
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code} className="text-white hover:bg-gray-800">
                            <span className="flex items-center gap-2">
                              <span>{lang.flag}</span>
                              <span>{lang.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {user ? (
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-900">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" alt={user.name} />
                            <AvatarFallback className="bg-[#d03232] text-white">
                              {user.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-white">{user.name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                          {user.isPremium && <Crown className="w-4 h-4 text-[#d03232]" />}
                        </div>
                        <Button
                          asChild
                          variant="outline"
                          className="justify-start bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
                        >
                          <Link href="/dashboard">
                            <User className="mr-2 h-4 w-4 text-[#d03232]" />
                            {t("nav.dashboard")}
                          </Link>
                        </Button>
                        <Button
                          onClick={logout}
                          variant="outline"
                          className="justify-start text-red-400 bg-gray-900 border-gray-700 hover:bg-gray-800"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          {t("nav.logout")}
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        <Button
                          asChild
                          variant="outline"
                          className="justify-start bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
                        >
                          <Link href="/login">
                            <User className="mr-2 h-4 w-4 text-[#d03232]" />
                            {t("nav.login")}
                          </Link>
                        </Button>
                        <Button asChild className="btn-primary">
                          <Link href="/signup">{t("nav.signup")}</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
