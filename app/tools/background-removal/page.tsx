"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { Upload, Download, Scissors, Loader2, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BackgroundRemovalPage() {
  const { t } = useLanguage()
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [originalFile, setOriginalFile] = useState<File | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setOriginalFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        setOriginalImage(reader.result as string)
        setProcessedImage(null)
        setError(null)
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
    maxSize: 10 * 1024 * 1024, // 10MB limit
  })

  const processImage = async () => {
    if (!originalFile) return

    setIsProcessing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", originalFile)

      const response = await fetch("/api/remove-bg", {
        method: "POST",
        body: formData,
      })

      if (response.status === 202) {
        // Feature is being prepared
        const data = await response.json()
        setError(
          "La fonctionnalité de suppression d'arrière-plan IA est en cours de préparation. Veuillez réessayer plus tard.",
        )
        return
      }

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process image")
      }

      // Check if response is JSON (error) or blob (success)
      const contentType = response.headers.get("content-type")
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process image")
      }

      const blob = await response.blob()
      const processedDataUrl = URL.createObjectURL(blob)
      setProcessedImage(processedDataUrl)
    } catch (error) {
      console.error("Error processing image:", error)
      setError(error instanceof Error ? error.message : "An error occurred while processing the image")
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadImage = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    link.download = "background-removed.png"
    link.click()
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{t("tools.background_removal")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Supprimez les arrière-plans de vos images instantanément avec l'IA avancée
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="max-w-6xl mx-auto mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Section */}
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Image Originale
              </CardTitle>
              <CardDescription>Téléchargez votre image pour supprimer l'arrière-plan avec l'IA</CardDescription>
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
                  <p className="text-muted-foreground">ou cliquez pour parcourir (max 10MB)</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={originalImage || "/placeholder.svg"}
                    alt="Original"
                    className="w-full h-64 object-contain rounded-lg bg-muted"
                  />
                  <Button
                    onClick={processImage}
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Traitement IA en cours...
                      </>
                    ) : (
                      <>
                        <Scissors className="h-4 w-4 mr-2" />
                        Supprimer l'arrière-plan avec l'IA
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
                Image Traitée
              </CardTitle>
              <CardDescription>Votre image avec l'arrière-plan supprimé par l'IA</CardDescription>
            </CardHeader>
            <CardContent>
              {!processedImage ? (
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <Scissors className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">L'image traitée apparaîtra ici</p>
                  <p className="text-muted-foreground">Téléchargez une image pour commencer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={processedImage || "/placeholder.svg"}
                      alt="Processed"
                      className="w-full h-64 object-contain rounded-lg"
                      style={{
                        backgroundColor: "transparent",
                        backgroundImage:
                          "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                      }}
                    />
                  </div>
                  <Button onClick={downloadImage} className="w-full bg-primary hover:bg-primary/90">
                    <Download className="h-4 w-4 mr-2" />
                    {t("common.download")}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto mt-12">
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Suppression d'arrière-plan IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Téléchargez</h3>
                  <p className="text-sm text-muted-foreground">Glissez-déposez votre image ou cliquez pour parcourir</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Scissors className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">IA Traite</h3>
                  <p className="text-sm text-muted-foreground">
                    Notre IA détecte et supprime automatiquement l'arrière-plan
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Téléchargez</h3>
                  <p className="text-sm text-muted-foreground">Obtenez votre image avec un arrière-plan transparent</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
