"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { Upload, Download, Maximize, Loader2, Link } from "lucide-react"
import { useDropzone } from "react-dropzone"

export default function ImageResizerPage() {
  const { t } = useLanguage()
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [width, setWidth] = useState<number>(800)
  const [height, setHeight] = useState<number>(600)
  const [maintainAspectRatio, setMaintainAspectRatio] = useState<boolean>(true)
  const [fit, setFit] = useState<string>("cover")
  const [format, setFormat] = useState<string>("png")
  const [currentFile, setCurrentFile] = useState<File | null>(null)
  const [originalDimensions, setOriginalDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  })

  const fitOptions = [
    { value: "cover", label: "Cover (remplir)" },
    { value: "contain", label: "Contain (ajuster)" },
    { value: "fill", label: "Fill (étirer)" },
    { value: "inside", label: "Inside (réduire)" },
    { value: "outside", label: "Outside (agrandir)" },
  ]

  const formats = [
    { value: "png", label: "PNG" },
    { value: "jpeg", label: "JPEG" },
    { value: "webp", label: "WebP" },
    { value: "avif", label: "AVIF" },
  ]

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setCurrentFile(file)
      const reader = new FileReader()
      reader.onload = () => {
        const img = new Image()
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height })
          setWidth(img.width)
          setHeight(img.height)
        }
        img.src = reader.result as string
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

  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth)
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const aspectRatio = originalDimensions.height / originalDimensions.width
      setHeight(Math.round(newWidth * aspectRatio))
    }
  }

  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight)
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height
      setWidth(Math.round(newHeight * aspectRatio))
    }
  }

  const resizeImage = async () => {
    if (!currentFile) return

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append("file", currentFile)
      formData.append("width", width.toString())
      formData.append("height", height.toString())
      formData.append("fit", fit)
      formData.append("format", format)

      const response = await fetch("/api/resize-image", {
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
      console.error("Error resizing image:", error)
      alert("Une erreur s'est produite lors du redimensionnement")
      setIsProcessing(false)
    }
  }

  const downloadImage = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    link.download = `resized-${width}x${height}.${format}`
    link.click()
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">{t("tools.image_resizer")}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("tools.image_resizer.desc")}</p>
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
                  <div className="text-sm text-muted-foreground">
                    Dimensions originales: {originalDimensions.width} × {originalDimensions.height}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="aspect-ratio"
                      checked={maintainAspectRatio}
                      onCheckedChange={(checked) => setMaintainAspectRatio(checked as boolean)}
                    />
                    <Label htmlFor="aspect-ratio" className="flex items-center gap-2">
                      <Link className="h-4 w-4" />
                      Maintenir les proportions
                    </Label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width">Largeur</Label>
                      <Input
                        id="width"
                        type="number"
                        value={width}
                        onChange={(e) => handleWidthChange(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Hauteur</Label>
                      <Input
                        id="height"
                        type="number"
                        value={height}
                        onChange={(e) => handleHeightChange(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="fit">Mode de redimensionnement</Label>
                    <Select value={fit} onValueChange={setFit}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choisir un mode" />
                      </SelectTrigger>
                      <SelectContent>
                        {fitOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="format">Format de sortie</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choisir un format" />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.map((fmt) => (
                          <SelectItem key={fmt.value} value={fmt.value}>
                            {fmt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={resizeImage}
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
                        <Maximize className="h-4 w-4 mr-2" />
                        Redimensionner l'image
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
                Image Redimensionnée
              </CardTitle>
              <CardDescription>Votre image aux nouvelles dimensions</CardDescription>
            </CardHeader>
            <CardContent>
              {!processedImage ? (
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <Maximize className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">L'image redimensionnée apparaîtra ici</p>
                  <p className="text-muted-foreground">Téléchargez une image pour commencer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={processedImage || "/placeholder.svg"}
                    alt="Resized"
                    className="w-full h-64 object-contain rounded-lg bg-muted"
                  />
                  <div className="text-sm text-muted-foreground">
                    Nouvelles dimensions: {width} × {height}
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
