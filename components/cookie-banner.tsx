"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, X, Settings } from "lucide-react"
import Link from "next/link"

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "accepted")
    localStorage.setItem("analytics-cookies", "true")
    localStorage.setItem("marketing-cookies", "true")
    setShowBanner(false)
  }

  const acceptEssential = () => {
    localStorage.setItem("cookie-consent", "essential")
    localStorage.setItem("analytics-cookies", "false")
    localStorage.setItem("marketing-cookies", "false")
    setShowBanner(false)
  }

  const rejectAll = () => {
    localStorage.setItem("cookie-consent", "rejected")
    localStorage.setItem("analytics-cookies", "false")
    localStorage.setItem("marketing-cookies", "false")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-4 left-4 right-4 z-50 cookie-banner"
      >
        <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl overflow-hidden max-w-md mx-auto">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center flex-shrink-0">
                <Cookie className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Nous utilisons des cookies</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Nous utilisons des cookies pour améliorer votre expérience et analyser notre trafic. Consultez notre{" "}
                  <Link href="/cookies" className="text-primary-600 hover:underline">
                    politique de cookies
                  </Link>
                  .
                </p>

                {!showSettings ? (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={acceptAll}
                      size="sm"
                      className="bg-primary-600 hover:bg-primary-700 text-white rounded-full"
                    >
                      Accepter tout
                    </Button>
                    <Button
                      onClick={() => setShowSettings(true)}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 dark:border-gray-600 rounded-full"
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Paramètres
                    </Button>
                    <Button
                      onClick={rejectAll}
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 dark:text-gray-400 rounded-full"
                    >
                      Refuser
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex justify-between items-center py-1">
                        <span>Cookies essentiels</span>
                        <span className="text-green-600">Toujours actifs</span>
                      </div>
                      <div className="flex justify-between items-center py-1">
                        <span>Cookies analytiques</span>
                        <span className="text-gray-400">Optionnels</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={acceptAll}
                        size="sm"
                        className="bg-primary-600 hover:bg-primary-700 text-white rounded-full"
                      >
                        Accepter tout
                      </Button>
                      <Button
                        onClick={acceptEssential}
                        variant="outline"
                        size="sm"
                        className="border-gray-300 dark:border-gray-600 rounded-full bg-transparent"
                      >
                        Essentiels uniquement
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <Button
                onClick={() => setShowBanner(false)}
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
