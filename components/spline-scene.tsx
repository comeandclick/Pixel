"use client"

import type React from "react"
import { Suspense, useState } from "react"
import dynamic from "next/dynamic"

// Import dynamique de Spline pour éviter les erreurs SSR
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Chargement de la scène 3D...</p>
      </div>
    </div>
  ),
})

interface SplineSceneProps {
  scene: string
  className?: string
  fallback?: React.ReactNode
}

export function SplineScene({ scene, className = "", fallback }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const defaultFallback = (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Chargement de la scène 3D...</p>
      </div>
    </div>
  )

  const errorFallback = (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
      <div className="text-center p-8">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-primary-600 dark:text-primary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Modèle 3D Premium</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Découvrez nos gourdes HYDRATE avec un design innovant et des matériaux premium
        </p>
      </div>
    </div>
  )

  const handleSplineLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleSplineError = (error: any) => {
    console.warn("Erreur de chargement Spline:", error)
    setHasError(true)
    setIsLoading(false)
  }

  // Vérifier si l'URL Spline est valide
  const isValidSplineUrl = (url: string) => {
    return (
      url &&
      (url.includes("spline.design") || url.includes(".splinecode") || url.startsWith("https://prod.spline.design/"))
    )
  }

  if (hasError || !isValidSplineUrl(scene)) {
    return <div className={`spline-container ${className}`}>{errorFallback}</div>
  }

  return (
    <div className={`spline-container ${className}`}>
      <Suspense fallback={fallback || defaultFallback}>
        <div className="w-full h-full relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">Chargement de la scène 3D...</p>
              </div>
            </div>
          )}
          <Spline
            scene={scene}
            onLoad={handleSplineLoad}
            onError={handleSplineError}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </Suspense>
    </div>
  )
}
