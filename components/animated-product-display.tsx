"use client"

import { SplineScene } from "./spline-scene"

interface AnimatedProductDisplayProps {
  product: {
    id: number
    name: string
  }
}

export function AnimatedProductDisplay({ product }: AnimatedProductDisplayProps) {
  // URLs Spline de démonstration pour chaque produit
  const splineScenes = {
    1: "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode", // HYDRATE Pro
    2: "https://prod.spline.design/llcLc77DYxBiggNf/scene.splinecode", // HYDRATE Elite
    3: "https://prod.spline.design/uwJSEFAHpilp5T7s/scene.splinecode", // HYDRATE Classic
  }

  const sceneUrl = splineScenes[product.id as keyof typeof splineScenes] || splineScenes[1]

  return (
    <div className="w-full h-[500px]">
      <SplineScene
        scene={sceneUrl}
        className="w-full h-full"
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Chargement du modèle 3D...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{product.name}</p>
            </div>
          </div>
        }
      />
    </div>
  )
}
