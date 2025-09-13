"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, Download, Loader2, ImageIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function BackgroundRemovalPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const { t } = useLanguage()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)

      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  })

  const processImage = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append("image", file)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error("Failed to process image")
      }

      const data = await response.json()
      setResult(data.imageUrl)
      setProgress(100)
    } catch (error) {
      console.error("Error processing image:", error)
      alert("Error processing image. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadResult = () => {
    if (!result) return

    const link = document.createElement("a")
    link.href = result
    link.download = `background-removed-${Date.now()}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resetTool = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    setProgress(0)
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">{t("tools.backgroundRemoval")}</h1>
            <p className="text-xl text-gray-300">{t("features.backgroundRemovalDesc")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Upload Image</CardTitle>
                <CardDescription className="text-gray-400">
                  {t("tools.supportedFormats")}: PNG, JPG, JPEG, WebP
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-red-500 bg-red-500/10" : "border-gray-600 hover:border-red-500"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  {isDragActive ? (
                    <p className="text-red-400">{t("tools.dragDrop")}</p>
                  ) : (
                    <div>
                      <p className="text-gray-300 mb-2">{t("tools.dragDrop")}</p>
                      <p className="text-sm text-gray-500">{t("tools.maxSize")}</p>
                    </div>
                  )}
                </div>

                {preview && (
                  <div className="mt-6">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-64 object-contain rounded-lg bg-gray-800"
                    />
                    <div className="flex gap-4 mt-4">
                      <Button
                        onClick={processImage}
                        disabled={isProcessing}
                        className="flex-1 bg-red-500 hover:bg-red-600"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            {t("tools.processing")}
                          </>
                        ) : (
                          <>
                            <ImageIcon className="w-4 h-4 mr-2" />
                            Remove Background
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={resetTool}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Result Section */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Result</CardTitle>
                <CardDescription className="text-gray-400">Your processed image will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                {isProcessing && (
                  <div className="space-y-4">
                    <Progress value={progress} className="w-full" />
                    <p className="text-center text-gray-400">
                      {t("tools.processing")} {progress}%
                    </p>
                  </div>
                )}

                {result && (
                  <div className="space-y-4">
                    <img
                      src={result || "/placeholder.svg"}
                      alt="Result"
                      className="w-full h-64 object-contain rounded-lg bg-gray-800"
                    />
                    <div className="flex gap-4">
                      <Button onClick={downloadResult} className="flex-1 bg-green-600 hover:bg-green-700">
                        <Download className="w-4 h-4 mr-2" />
                        {t("tools.download")}
                      </Button>
                      <Button
                        onClick={resetTool}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        {t("tools.uploadAnother")}
                      </Button>
                    </div>
                  </div>
                )}

                {!isProcessing && !result && (
                  <div className="h-64 flex items-center justify-center bg-gray-800 rounded-lg">
                    <p className="text-gray-500">Upload an image to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
