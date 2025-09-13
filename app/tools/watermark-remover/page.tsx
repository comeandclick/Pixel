"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import { Upload, Download, Droplets, Loader2, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"

export default function WatermarkRemoverPage() {
  const { t } = useLanguage()
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [sensitivity, setSensitivity] = useState<number>(50)
  const [blurRadius, setBlurRadius] = useState<number>(3)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setOriginalImage(reader.result as string)
        setProcessedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    multiple: false,
  })

  const removeWatermark = async () => {
    if (!originalImage) return

    setIsProcessing(true)

    try {
      const img = new Image()
      img.crossOrigin = "anonymous"

      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          setIsProcessing(false)
          return
        }

        canvas.width = img.width
        canvas.height = img.height

        // Draw original image
        ctx.drawImage(img, 0, 0)

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        // Simple watermark removal algorithm (demo version)
        // This detects semi-transparent overlays and attempts to remove them
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const a = data[i + 3]

          // Detect potential watermark pixels (semi-transparent or specific colors)
          const isLikelyWatermark =
            (a < 255 && a > 100) || // Semi-transparent
            (r > 200 && g > 200 && b > 200 && a > 200) || // Light overlay
            (Math.abs(r - g) < 30 && Math.abs(g - b) < 30 && Math.abs(r - b) < 30) // Grayscale-ish

          if (isLikelyWatermark && Math.random() * 100 < sensitivity) {
            // Apply inpainting-like effect by averaging surrounding pixels
            const x = (i / 4) % canvas.width
            const y = Math.floor(i / 4 / canvas.width)

            let avgR = 0,
              avgG = 0,
              avgB = 0,
              count = 0

            // Sample surrounding pixels
            for (let dy = -blurRadius; dy <= blurRadius; dy++) {
              for (let dx = -blurRadius; dx <= blurRadius; dx++) {
                const nx = x + dx
                const ny = y + dy

                if (nx >= 0 && nx < canvas.width && ny >= 0 && ny < canvas.height) {
                  const idx = (ny * canvas.width + nx) * 4
                  if (idx !== i) {
                    avgR += data[idx]
                    avgG += data[idx + 1]
                    avgB += data[idx + 2]
                    count++
                  }
                }
              }
            }

            if (count > 0) {
              data[i] = avgR / count
              data[i + 1] = avgG / count
              data[i + 2] = avgB / count
              data[i + 3] = 255 // Full opacity
            }
          }
        }

        // Put processed image data back
        ctx.putImageData(imageData, 0, 0)

        // Convert to data URL
        const processedDataUrl = canvas.toDataURL("image/png")
        setProcessedImage(processedDataUrl)
        setIsProcessing(false)
      }

      img.src = originalImage
    } catch (error) {
      console.error("Error removing watermark:", error)
      setIsProcessing(false)
    }
  }

  const downloadImage = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    link.download = "watermark-removed.png"
    link.click()
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Suppresseur de Filigrane</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Supprimez les filigranes et overlays indésirables de vos images
          </p>
        </div>

        {/* Demo Notice */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="border-yellow-500/50 bg-yellow-500/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-yellow-400">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">
                  <strong>Version démo:</strong> Cet outil utilise un algorithme basique de détection et suppression.
                  Les résultats peuvent varier selon le type de filigrane.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Section */}
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Image avec Filigrane
              </CardTitle>
              <CardDescription>Téléchargez votre image pour supprimer le filigrane</CardDescription>
            </CardHeader>
            <CardContent>
              {!originalImage ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    {isDragActive ? "Déposez votre image ici" : "Glissez-déposez votre image"}
                  </p>
                  <p className="text-muted-foreground">ou cliquez pour parcourir</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={originalImage || "/placeholder.svg"}
                    alt="Original"
                    className="w-full h-64 object-contain rounded-lg bg-muted"
                  />

                  <div className="space-y-2">
                    <Label htmlFor="sensitivity">Sensibilité de détection: {sensitivity}%</Label>
                    <Slider
                      id="sensitivity"
                      min={10}
                      max={90}
                      step={5}
                      value={[sensitivity]}
                      onValueChange={(value) => setSensitivity(value[0])}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">Plus élevé = plus agressif dans la suppression</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="blur">Rayon de lissage: {blurRadius}px</Label>
                    <Slider
                      id="blur"
                      min={1}
                      max={10}
                      step={1}
                      value={[blurRadius]}
                      onValueChange={(value) => setBlurRadius(value[0])}
                      className="w-full"
                    />
                    <p className="text-xs text-muted-foreground">Zone de reconstruction autour des pixels supprimés</p>
                  </div>

                  <Button
                    onClick={removeWatermark}
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Suppression en cours...
                      </>
                    ) : (
                      <>
                        <Droplets className="h-4 w-4 mr-2" />
                        Supprimer le filigrane
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Result Section */}
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Image Nettoyée
              </CardTitle>
              <CardDescription>Votre image sans filigrane</CardDescription>
            </CardHeader>
            <CardContent>
              {!processedImage ? (
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <Droplets className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">L'image nettoyée apparaîtra ici</p>
                  <p className="text-muted-foreground">Téléchargez une image pour commencer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={processedImage || "/placeholder.svg"}
                    alt="Processed"
                    className="w-full h-64 object-contain rounded-lg bg-muted"
                  />
                  <Button onClick={downloadImage} className="w-full bg-primary hover:bg-primary/90">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger l'image nettoyée
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
