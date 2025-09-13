"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/components/auth-provider"
import { useActivity } from "@/components/activity-tracker"
import { validateEmail } from "@/lib/validation"
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const { t } = useLanguage()
  const { login, isLoading, user } = useAuth()
  const { addActivity } = useActivity()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isRedirectingToSignup, setIsRedirectingToSignup] = useState(false)

  useEffect(() => {
    if (user) {
      const redirectTo = searchParams.get("redirect") || "/dashboard"
      router.push(redirectTo)
    }
  }, [user, router, searchParams])

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setError("")

    if (newEmail && !validateEmail(newEmail).isValid) {
      setEmailError("Format d'email invalide")
    } else {
      setEmailError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setEmailError("")

    const emailValidation = validateEmail(email)
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.errors[0])
      return
    }

    if (!password) {
      setError("Le mot de passe est requis")
      return
    }

    const result = await login(email, password)
    if (result.success) {
      addActivity({
        type: "login",
        title: "Connexion réussie",
        description: `Connexion depuis ${navigator.userAgent.includes("Mobile") ? "mobile" : "desktop"}`,
      })

      const redirectTo = searchParams.get("redirect") || "/dashboard"
      router.push(redirectTo)
    } else {
      setError(result.error || "Erreur de connexion")

      if (result.error?.includes("Aucun compte trouvé")) {
        setIsRedirectingToSignup(true)
        setTimeout(() => {
          router.push(`/signup?email=${encodeURIComponent(email)}`)
        }, 3000)
      }
    }
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Redirection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md gradient-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold gradient-text">{t("auth.login.title")}</CardTitle>
          <CardDescription>{t("auth.login.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                disabled={isLoading}
                className={`glass-effect ${emailError ? "border-red-500" : ""}`}
                placeholder="exemple@email.com"
              />
              {emailError && <p className="text-red-400 text-sm">{emailError}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  required
                  disabled={isLoading}
                  className="glass-effect pr-10"
                  placeholder="Votre mot de passe"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isRedirectingToSignup && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Redirection vers la page d'inscription dans 3 secondes...</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading || isRedirectingToSignup}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion...
                </>
              ) : (
                t("nav.login")
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{t("auth.no_account")} </span>
            <Link href="/signup" className="text-primary hover:underline">
              {t("nav.signup")}
            </Link>
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center mb-2">Comptes de démonstration :</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <div>📧 demo@pixel.com | 🔑 Demo123!</div>
              <div>📧 test@example.com | 🔑 Test123!</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
