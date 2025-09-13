import type React from "react"
import type { Metadata } from "next"
import { LanguageProvider } from "@/components/language-provider"
import { AuthProvider } from "@/components/auth-provider"
import { ActivityProvider } from "@/components/activity-tracker"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ParallaxBackground } from "@/components/parallax-background"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Pixel - AI-Powered Image Editing Tools",
  description:
    "Transform your images with our advanced AI tools. Remove backgrounds, compress files, resize images, and much more.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ParallaxBackground />
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>
            <AuthProvider>
              <ActivityProvider>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
              </ActivityProvider>
            </AuthProvider>
          </LanguageProvider>
        </Suspense>
      </body>
    </html>
  )
}
