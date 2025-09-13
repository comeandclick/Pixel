"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, ImageIcon, Crown, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const formats = [
  { value: "png", label: "PNG", description: "Best for images with transparency" },
  { value: "jpg", label: "JPEG", description: "Best for photos and complex images" },
  { value: "webp", label: "WebP", description: "Modern format with great compression" },
  { value: "gif", label: "GIF", description: "Best for simple animations" },
  { value: "bmp", label: "BMP", description: "Uncompressed bitmap format" },
  { value: "tiff", label: "TIFF", description: "High quality for professional use" },
]

export default function FormatConverterPage() {
  const [file, setFile] = useState<File | null>(null)
  const [convertedImage, setConvertedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedFormat, setSelectedFormat] = useState("png")
  const [selectedQuality, setSelectedQuality] = useState<"free" | "premium">("free")

  const { user } = useAuth()
  const { t } = useLanguage()
  const { toast } = useToast()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        if (file.size > 10 * 1024 * 1024) {
          toast({
            title: t("common.error"),
            description: t("common.file_too_large"),
            variant: "destructive",
          })
          return
        }

        if (!file.type.startsWith("image/")) {
          toast({
            title: t("common.error"),
            description: t("common.invalid_format"),
            variant: "destructive",
          })
          return
        }

        setFile(file)
        setConvertedImage(null)
      }
    },
    [toast, t],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tiff"],
    },
    multiple: false,
  })

  const convertImage = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 150)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)

        let mimeType = "image/png"
        const quality = selectedQuality === "premium" ? 0.95 : 0.8

        switch (selectedFormat) {
          case "jpg":
            mimeType = "image/jpeg"
            break
          case "webp":
            mimeType = "image/webp"
            break
          case "png":
            mimeType = "image/png"
            break
          default:
            mimeType = "image/png"
        }

        const convertedDataUrl = canvas.toDataURL(mimeType, quality)
        setConvertedImage(convertedDataUrl)
        setProgress(100)

        toast({
          title: t("common.success"),
          description: t("common.processing_complete"),
        })
      }

      img.src = URL.createObjectURL(file)
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Conversion failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      clearInterval(interval)
    }
  }

  const downloadImage = () => {
    if (!convertedImage) return

    const link = document.createElement("a")
    link.href = convertedImage
    link.download = `converted-${selectedQuality}.${selectedFormat}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-2xl flex items-center justify-center mr-4 glow-red">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">{t("tools.format_converter")}</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("tools.format_converter_desc")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white">Upload & Convert</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  {...getRootProps()}
                  className={`upload-area p-8 rounded-xl text-center cursor-pointer transition-all duration-300 ${
                    isDragActive ? "dragover" : ""
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-white mb-2">
                    {isDragActive ? "Drop your image here" : t("upload.drag_drop")}
                  </p>
                  <p className="text-gray-400 mb-4">{t("upload.or")}</p>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                    {t("upload.browse")}
                  </Button>
                  <p className="text-sm text-gray-400 mt-4">Supports PNG, JPG, WebP, GIF, BMP, TIFF (max 10MB)</p>
                </div>

                {file && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{file.name}</p>
                        <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-600 text-white">
                        Ready
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-medium text-white">Output Format</h3>
                      <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                        <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-gray-800">
                          {formats.map((format) => (
                            <SelectItem
                              key={format.value}
                              value={format.value}
                              className="text-white hover:bg-gray-800"
                            >
                              <div>
                                <div className="font-medium">{format.label}</div>
                                <div className="text-sm text-gray-400">{format.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-medium text-white">Output Quality</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div
                          onClick={() => setSelectedQuality("free")}
                          className={`quality-option p-4 rounded-lg cursor-pointer ${
                            selectedQuality === "free" ? "selected" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-white">Standard</span>
                            <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                              80%
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">Good quality for web use</p>
                        </div>

                        <div
                          onClick={() => (user ? setSelectedQuality("premium") : null)}
                          className={`quality-option p-4 rounded-lg cursor-pointer ${
                            selectedQuality === "premium" ? "selected" : ""
                          } ${!user ? "disabled" : ""}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium flex items-center text-white">
                              Premium
                              <Crown className="w-4 h-4 ml-1 text-[#d03232]" />
                            </span>
                            <Badge className="bg-[#d03232] text-white">95%</Badge>
                          </div>
                          <p className="text-sm text-gray-400">
                            {user ? "Highest quality for professional use" : t("quality.login_required")}
                          </p>
                        </div>
                      </div>

                      {!user && (
                        <div className="flex items-center gap-2 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          <p className="text-sm text-yellow-400">
                            <Link href="/login" className="underline">
                              Login
                            </Link>{" "}
                            to access premium quality
                          </p>
                        </div>
                      )}
                    </div>

                    <Button onClick={convertImage} disabled={isProcessing} className="w-full btn-primary">
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          {t("upload.processing")}
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-4 h-4 mr-2" />
                          Convert to {selectedFormat.toUpperCase()}
                        </>
                      )}
                    </Button>

                    {isProcessing && (
                      <div className="space-y-2">
                        <Progress value={progress} className="w-full" />
                        <p className="text-sm text-gray-400 text-center">{progress}% complete</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white">Converted Image</CardTitle>
              </CardHeader>
              <CardContent>
                {convertedImage ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <img
                        src={convertedImage || "/placeholder.svg"}
                        alt="Converted"
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-[#d03232] text-white">{selectedFormat.toUpperCase()}</Badge>
                      </div>
                    </div>

                    <Button onClick={downloadImage} className="w-full btn-primary">
                      <Download className="w-4 h-4 mr-2" />
                      Download {selectedFormat.toUpperCase()}
                    </Button>

                    <div className="text-center">
                      <Button
                        asChild
                        variant="outline"
                        className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                      >
                        <Link href="/donate">
                          <Crown className="w-4 h-4 mr-2" />
                          Support Pixel
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-400">Upload an image to see the converted result here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
