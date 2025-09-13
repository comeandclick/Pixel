"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/components/language-provider"
import { Upload, Download, RefreshCw, Loader2 } from "lucide-react"
import { useDropzone } from "react-dropzone"

export default function FormatConverterPage() {
  const { t } = useLanguage()
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [originalFormat, setOriginalFormat] = useState<string>("")
  const [targetFormat, setTargetFormat] = useState<string>("webp")
  const [currentFile, setCurrentFile] = useState<File | null>(null)

  const formats = [
    { value: "webp", label: "WebP" },
    { value: "png", label: "PNG" },
    { value: "jpeg", label: "JPEG" },
    { value: "avif", label: "AVIF" },
  ]

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setCurrentFile(file)
      const format = file.name.split(".").pop()?.toLowerCase() || ""
      setOriginalFormat(format)
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
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp"],
    },
    multiple: false,
  })

  const convertImage = async () => {
    if (!currentFile) return

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append("file", currentFile)
      formData.append("format", targetFormat)

      const response = await fetch("/api/convert-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      setProcessedImage(url)
      setIsProcessing(false)
    } catch (error) {
      console.error("Error converting image:", error)
      alert("Une erreur s'est produite lors de la conversion")
      setIsProcessing(false)
    }
  }

  const downloadImage = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    link.download = `converted-image.${targetFormat}`
    link.click()
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{t("tools.format_converter")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("tools.format_converter.desc")}</p>
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
                  <div className="text-sm text-muted-foreground">Format original: {originalFormat.toUpperCase()}</div>

                  <div>
                    <Label htmlFor="target-format">Format de sortie</Label>
                    <Select value={targetFormat} onValueChange={setTargetFormat}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choisir un format" />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={convertImage}
                    disabled={isProcessing || originalFormat === targetFormat}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {t("common.processing")}
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Convertir en {targetFormat.toUpperCase()}
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
                Image Convertie
              </CardTitle>
              <CardDescription>Votre image au nouveau format</CardDescription>
            </CardHeader>
            <CardContent>
              {!processedImage ? (
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <RefreshCw className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">L'image convertie apparaîtra ici</p>
                  <p className="text-muted-foreground">Téléchargez une image pour commencer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={processedImage || "/placeholder.svg"}
                    alt="Converted"
                    className="w-full h-64 object-contain rounded-lg bg-muted"
                  />
                  <div className="text-sm text-muted-foreground">Nouveau format: {targetFormat.toUpperCase()}</div>
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
