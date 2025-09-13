"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-provider"
import { useAuth } from "./auth-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, User, LogOut } from "lucide-react"

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { user, logout } = useAuth()

  const languages = [
    { code: "fr" as const, name: "Français" },
    { code: "en" as const, name: "English" },
    { code: "es" as const, name: "Español" },
    { code: "de" as const, name: "Deutsch" },
  ]

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact-section")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          Pixel
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
            {t("nav.home")}
          </Link>
          <Link href="/tools" className="text-muted-foreground hover:text-primary transition-colors">
            {t("nav.tools")}
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
            {t("nav.about")}
          </Link>
          <button onClick={scrollToContact} className="text-muted-foreground hover:text-primary transition-colors">
            {t("nav.contact")}
          </button>
          <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
            {t("nav.blog")}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                {languages.find((l) => l.code === language)?.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={language === lang.code ? "bg-gray-100" : ""}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth Buttons */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">{t("nav.dashboard")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("nav.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">{t("nav.login")}</Link>
              </Button>
              <Button size="sm" className="bg-[#d03232] hover:bg-[#b02828]" asChild>
                <Link href="/signup">{t("nav.signup")}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
