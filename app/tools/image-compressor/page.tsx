"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Upload, Download, Loader2, ImageIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const [quality, setQuality] = useState([80])
  const [isProcessing, setIsProcessing] = useState(false)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const { t } = useLanguage()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      setFile(selectedFile)
      setOriginalSize(selectedFile.size)
      setCompressedImage(null)

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

  const compressImage = async () => {
    if (!file || !preview) return

    setIsProcessing(true)

    try {
      // Create canvas for compression
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height

        if (ctx) {
          ctx.drawImage(img, 0, 0)

          // Convert to blob with specified quality
          canvas.toBlob(
            (blob) => {
              if (blob) {
                setCompressedSize(blob.size)
                const url = URL.createObjectURL(blob)
                setCompressedImage(url)
              }
              setIsProcessing(false)
            },
            "image/jpeg",
            quality[0] / 100,
          )
        }
      }

      img.src = preview
    } catch (error) {
      console.error("Error compressing image:", error)
      setIsProcessing(false)
    }
  }

  const downloadCompressed = () => {
    if (!compressedImage) return

    const link = document.createElement("a")
    link.href = compressedImage
    link.download = `compressed-${Date.now()}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const resetTool = () => {
    setFile(null)
    setPreview(null)
    setCompressedImage(null)
    setOriginalSize(0)
    setCompressedSize(0)
    setQuality([80])
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const compressionRatio =
    originalSize > 0 && compressedSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">{t("tools.imageCompressor")}</h1>
            <p className="text-xl text-gray-300">{t("features.imageCompressionDesc")}</p>
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
                  <div className="mt-6 space-y-4">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-64 object-contain rounded-lg bg-gray-800"
                    />

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Quality: {quality[0]}%</label>
                        <Slider
                          value={quality}
                          onValueChange={setQuality}
                          max={100}
                          min={10}
                          step={5}
                          className="w-full"
                        />
                      </div>

                      {originalSize > 0 && (
                        <div className="text-sm text-gray-400">Original size: {formatFileSize(originalSize)}</div>
                      )}
                    </div>

                    <div className="flex gap-4 mt-4">
                      <Button
                        onClick={compressImage}
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
                            Compress Image
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
                <CardTitle className="text-white">Compressed Result</CardTitle>
                <CardDescription className="text-gray-400">Your compressed image will appear here</CardDescription>
              </CardHeader>
              <CardContent>
                {compressedImage ? (
                  <div className="space-y-4">
                    <img
                      src={compressedImage || "/placeholder.svg"}
                      alt="Compressed"
                      className="w-full h-64 object-contain rounded-lg bg-gray-800"
                    />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-300">
                        <span>Compressed size:</span>
                        <span>{formatFileSize(compressedSize)}</span>
                      </div>
                      <div className="flex justify-between text-green-400">
                        <span>Size reduction:</span>
                        <span>{compressionRatio}%</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button onClick={downloadCompressed} className="flex-1 bg-green-600 hover:bg-green-700">
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
                ) : (
                  <div className="h-64 flex items-center justify-center bg-gray-800 rounded-lg">
                    <p className="text-gray-500">Upload an image to compress</p>
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
