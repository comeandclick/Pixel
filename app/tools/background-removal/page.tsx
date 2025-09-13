"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { Upload, Download, Scissors, Loader2 } from "lucide-react"
import { useDropzone } from "react-dropzone"

export default function BackgroundRemovalPage() {
  const { t } = useLanguage()
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

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

  const processImage = async () => {
    if (!originalImage) return

    setIsProcessing(true)
    // Simulate AI processing
    setTimeout(() => {
      setProcessedImage(originalImage) // In real app, this would be the processed image
      setIsProcessing(false)
    }, 3000)
  }

  const downloadImage = () => {
    if (!processedImage) return

    const link = document.createElement("a")
    link.href = processedImage
    link.download = "background-removed.png"
    link.click()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t("tools.background_removal")}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Remove backgrounds from your images instantly with AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Upload Section */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Original Image
            </CardTitle>
            <CardDescription>Upload your image to remove the background</CardDescription>
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
                  {isDragActive ? "Drop your image here" : "Drag & drop your image"}
                </p>
                <p className="text-muted-foreground">or click to browse</p>
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
                      Processing...
                    </>
                  ) : (
                    <>
                      <Scissors className="h-4 w-4 mr-2" />
                      Remove Background
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
              Processed Image
            </CardTitle>
            <CardDescription>Your image with background removed</CardDescription>
          </CardHeader>
          <CardContent>
            {!processedImage ? (
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                <Scissors className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-medium text-foreground mb-2">Processed image will appear here</p>
                <p className="text-muted-foreground">Upload an image to get started</p>
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
                  Download Image
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
