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
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/components/language-provider"
import { useAuth } from "@/components/auth-provider"
import { useActivity } from "@/components/activity-tracker"
import { validateEmail, validatePassword, validateName, validatePasswordMatch } from "@/lib/validation"
import { Loader2, AlertCircle, Eye, EyeOff, Check, X } from "lucide-react"

export default function SignupPage() {
  const { t } = useLanguage()
  const { signup, isLoading, user } = useAuth()
  const { addActivity } = useActivity()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const validateField = (field: string, value: string) => {
    let validation
    switch (field) {
      case "name":
        validation = validateName(value)
        break
      case "email":
        validation = validateEmail(value)
        break
      case "password":
        validation = validatePassword(value)
        break
      case "confirmPassword":
        validation = validatePasswordMatch(password, value)
        break
      default:
        return
    }

    setFieldErrors((prev) => ({
      ...prev,
      [field]: validation.isValid ? "" : validation.errors[0],
    }))
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength += 20
    if (/[a-z]/.test(password)) strength += 20
    if (/[A-Z]/.test(password)) strength += 20
    if (/\d/.test(password)) strength += 20
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20
    return strength
  }

  const passwordStrength = getPasswordStrength(password)
  const getStrengthColor = (strength: number) => {
    if (strength < 40) return "bg-red-500"
    if (strength < 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStrengthText = (strength: number) => {
    if (strength < 40) return "Faible"
    if (strength < 80) return "Moyen"
    return "Fort"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})

    const nameValidation = validateName(name)
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)
    const passwordMatchValidation = validatePasswordMatch(password, confirmPassword)

    const errors: { [key: string]: string } = {}
    if (!nameValidation.isValid) errors.name = nameValidation.errors[0]
    if (!emailValidation.isValid) errors.email = emailValidation.errors[0]
    if (!passwordValidation.isValid) errors.password = passwordValidation.errors[0]
    if (!passwordMatchValidation.isValid) errors.confirmPassword = passwordMatchValidation.errors[0]

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    const result = await signup(email, password, name)
    if (result.success) {
      addActivity({
        type: "profile_updated",
        title: "Compte créé",
        description: `Nouveau compte créé pour ${name}`,
      })

      router.push("/dashboard")
    } else {
      setError(result.error || "Erreur lors de la création du compte")
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
          <CardTitle className="text-2xl font-bold gradient-text">{t("auth.signup.title")}</CardTitle>
          <CardDescription>{t("auth.signup.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  validateField("name", e.target.value)
                }}
                required
                disabled={isLoading}
                className={`glass-effect ${fieldErrors.name ? "border-red-500" : ""}`}
                placeholder="Votre nom complet"
              />
              {fieldErrors.name && <p className="text-red-400 text-sm">{fieldErrors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  validateField("email", e.target.value)
                }}
                required
                disabled={isLoading}
                className={`glass-effect ${fieldErrors.email ? "border-red-500" : ""}`}
                placeholder="exemple@email.com"
              />
              {fieldErrors.email && <p className="text-red-400 text-sm">{fieldErrors.email}</p>}
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
                    validateField("password", e.target.value)
                    if (confirmPassword) {
                      validateField("confirmPassword", confirmPassword)
                    }
                  }}
                  required
                  disabled={isLoading}
                  className={`glass-effect pr-10 ${fieldErrors.password ? "border-red-500" : ""}`}
                  placeholder="Mot de passe sécurisé"
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

              {password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Force du mot de passe:</span>
                    <span
                      className={`font-medium ${passwordStrength >= 80 ? "text-green-400" : passwordStrength >= 40 ? "text-yellow-400" : "text-red-400"}`}
                    >
                      {getStrengthText(passwordStrength)}
                    </span>
                  </div>
                  <Progress value={passwordStrength} className="h-2" />
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="flex items-center gap-2">
                      {password.length >= 8 ? (
                        <Check className="h-3 w-3 text-green-400" />
                      ) : (
                        <X className="h-3 w-3 text-red-400" />
                      )}
                      <span>Au moins 8 caractères</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/[a-z]/.test(password) ? (
                        <Check className="h-3 w-3 text-green-400" />
                      ) : (
                        <X className="h-3 w-3 text-red-400" />
                      )}
                      <span>Une minuscule</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/[A-Z]/.test(password) ? (
                        <Check className="h-3 w-3 text-green-400" />
                      ) : (
                        <X className="h-3 w-3 text-red-400" />
                      )}
                      <span>Une majuscule</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/\d/.test(password) ? (
                        <Check className="h-3 w-3 text-green-400" />
                      ) : (
                        <X className="h-3 w-3 text-red-400" />
                      )}
                      <span>Un chiffre</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? (
                        <Check className="h-3 w-3 text-green-400" />
                      ) : (
                        <X className="h-3 w-3 text-red-400" />
                      )}
                      <span>Un caractère spécial</span>
                    </div>
                  </div>
                </div>
              )}

              {fieldErrors.password && <p className="text-red-400 text-sm">{fieldErrors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("auth.confirm_password")}</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    validateField("confirmPassword", e.target.value)
                  }}
                  required
                  disabled={isLoading}
                  className={`glass-effect pr-10 ${fieldErrors.confirmPassword ? "border-red-500" : ""}`}
                  placeholder="Confirmez votre mot de passe"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {fieldErrors.confirmPassword && <p className="text-red-400 text-sm">{fieldErrors.confirmPassword}</p>}
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading || passwordStrength < 80}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création du compte...
                </>
              ) : (
                t("nav.signup")
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">{t("auth.have_account")} </span>
            <Link href="/login" className="text-primary hover:underline">
              {t("nav.login")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
