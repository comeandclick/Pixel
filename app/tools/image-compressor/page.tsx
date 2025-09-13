"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import { Upload, Download, ImageIcon, Loader2 } from "lucide-react"
import { useDropzone } from "react-dropzone"

export default function ImageCompressorPage() {
  const { t } = useLanguage()
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [quality, setQuality] = useState<number>(80)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setOriginalSize(file.size)
      const reader = new FileReader()
      reader.onload = () => {
        setOriginalImage(reader.result as string)
        setProcessedImage(null)
        setCompressedSize(0)
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

  const compressImage = async () => {
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

        // Draw image on canvas
        ctx.drawImage(img, 0, 0)

        // Compress image with specified quality
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality / 100)

        // Calculate compressed size (approximate)
        const compressedSizeBytes = Math.round((compressedDataUrl.length * 3) / 4)

        setProcessedImage(compressedDataUrl)
        setCompressedSize(compressedSizeBytes)
        setIsProcessing(false)
      }

      img.src = originalImage
    } catch (error) {
      console.error("Error compressing image:", error)
      setIsProcessing(false)
    }
  }

  const downloadImage = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    link.download = "compressed-image.jpg"
    link.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{t("tools.image_compressor")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("tools.image_compressor.desc")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Section */}
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                {t("common.upload")}
              </CardTitle>
              <CardDescription>{t("upload.drag_drop")}</CardDescription>
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
                    {isDragActive ? t("upload.drag_drop") : t("upload.select_files")}
                  </p>
                  <p className="text-muted-foreground">{t("upload.max_size")}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={originalImage || "/placeholder.svg"}
                    alt="Original"
                    className="w-full h-64 object-contain rounded-lg bg-muted"
                  />
                  <div className="text-sm text-muted-foreground">Taille originale: {formatFileSize(originalSize)}</div>

                  <div className="space-y-2">
                    <Label htmlFor="quality">Qualité: {quality}%</Label>
                    <Slider
                      id="quality"
                      min={10}
                      max={100}
                      step={5}
                      value={[quality]}
                      onValueChange={(value) => setQuality(value[0])}
                      className="w-full"
                    />
                  </div>

                  <Button
                    onClick={compressImage}
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {t("common.processing")}
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Compresser l'image
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
                Image Compressée
              </CardTitle>
              <CardDescription>Votre image optimisée</CardDescription>
            </CardHeader>
            <CardContent>
              {!processedImage ? (
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">L'image compressée apparaîtra ici</p>
                  <p className="text-muted-foreground">Téléchargez une image pour commencer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={processedImage || "/placeholder.svg"}
                    alt="Compressed"
                    className="w-full h-64 object-contain rounded-lg bg-muted"
                  />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Taille compressée: {formatFileSize(compressedSize)}</div>
                    <div className="text-green-400">
                      Économie: {formatFileSize(originalSize - compressedSize)} (
                      {Math.round(((originalSize - compressedSize) / originalSize) * 100)}%)
                    </div>
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
      </div>
    </div>
  )
}
