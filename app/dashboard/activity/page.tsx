"use client"

import { useAuth } from "@/components/auth-provider"
import { RecentActivity } from "@/components/recent-activity"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ActivityPage() {
  const { user, isLoading } = useAuth()
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au tableau de bord
            </Link>
          </Button>
          <h1 className="text-3xl font-bold gradient-text">Activité Récente</h1>
          <p className="text-muted-foreground mt-2">Consultez l'historique de toutes vos actions sur Pixel</p>
        </div>

        <div className="max-w-4xl">
          <RecentActivity limit={50} showHeader={false} />
        </div>
      </div>
    </div>
  )
}
