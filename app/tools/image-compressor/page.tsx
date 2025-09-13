"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Upload, Download, Compass as Compress, Crown, AlertCircle, Clipboard } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function ImageCompressorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [compressionLevel, setCompressionLevel] = useState([80])
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)

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
        setOriginalSize(file.size)
        setCompressedImage(null)
        setCompressedSize(0)
      }
    },
    [toast, t],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
    multiple: false,
  })

  // Paste from clipboard functionality
  const handlePaste = useCallback(async () => {
    try {
      const clipboardItems = await navigator.clipboard.read()
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith("image/")) {
            const blob = await clipboardItem.getType(type)
            const file = new File([blob], "pasted-image.png", { type })

            if (file.size > 10 * 1024 * 1024) {
              toast({
                title: t("common.error"),
                description: t("common.file_too_large"),
                variant: "destructive",
              })
              return
            }

            setFile(file)
            setOriginalSize(file.size)
            setCompressedImage(null)
            setCompressedSize(0)
            toast({
              title: t("common.success"),
              description: t("upload.paste_success"),
            })
            return
          }
        }
      }
      toast({
        title: t("common.error"),
        description: t("upload.no_image_clipboard"),
        variant: "destructive",
      })
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("upload.clipboard_access_failed"),
        variant: "destructive",
      })
    }
  }, [toast, t])

  // Real image compression
  const compressImage = async () => {
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
    }, 100)

    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)

        const quality = compressionLevel[0] / 100
        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality)

        // Calculate actual compressed size
        const compressedSizeBytes = Math.round((compressedDataUrl.length * 3) / 4)
        setCompressedSize(compressedSizeBytes)
        setCompressedImage(compressedDataUrl)
        setProgress(100)

        toast({
          title: t("common.success"),
          description: t("common.processing_complete"),
        })
      }

      img.crossOrigin = "anonymous"
      img.src = URL.createObjectURL(file)
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("upload.processing_failed"),
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      clearInterval(interval)
    }
  }

  // Fixed download function
  const downloadImage = async () => {
    if (!compressedImage) return

    try {
      // Convert data URL to blob
      const response = await fetch(compressedImage)
      const blob = await response.blob()

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `compressed-${compressionLevel[0]}-${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast({
        title: t("common.success"),
        description: t("upload.download_success"),
      })
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("upload.download_failed"),
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const compressionRatio = originalSize > 0 ? Math.round(((originalSize - compressedSize) / originalSize) * 100) : 0

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
            <div className="w-16 h-16 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-[#d03232]/20">
              <Compress className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">{t("tools.image_compressor")}</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("tools.image_compressor_desc")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">{t("tools.upload_compress")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed border-gray-600 rounded-xl p-8 text-center cursor-pointer transition-all duration-300 hover:border-[#d03232] hover:bg-gray-800/30 ${
                    isDragActive ? "border-[#d03232] bg-gray-800/30" : ""
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-white mb-2">
                    {isDragActive ? t("upload.drop_here") : t("upload.drag_drop")}
                  </p>
                  <p className="text-gray-400 mb-4">{t("upload.or")}</p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                      {t("upload.browse")}
                    </Button>
                    <Button
                      onClick={handlePaste}
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                    >
                      <Clipboard className="w-4 h-4 mr-2" />
                      {t("upload.paste")}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400 mt-4">{t("upload.supported_formats")} (max 10MB)</p>
                </div>

                {file && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div>
                        <p className="font-medium text-white">{file.name}</p>
                        <p className="text-sm text-gray-400">{formatFileSize(originalSize)}</p>
                      </div>
                      <Badge className="bg-green-600 text-white">{t("upload.ready")}</Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-white">{t("tools.compression_level")}</h3>
                          <span className="text-sm text-gray-400">{compressionLevel[0]}%</span>
                        </div>
                        <Slider
                          value={compressionLevel}
                          onValueChange={setCompressionLevel}
                          max={100}
                          min={10}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>{t("tools.high_compression")}</span>
                          <span>{t("tools.high_quality")}</span>
                        </div>
                      </div>

                      {!user && compressionLevel[0] > 70 && (
                        <div className="flex items-center gap-2 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          <p className="text-sm text-yellow-400">
                            <Link href="/login" className="underline hover:text-yellow-300">
                              {t("auth.login")}
                            </Link>{" "}
                            {t("quality.high_quality_access")}
                          </p>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={compressImage}
                      disabled={isProcessing || (!user && compressionLevel[0] > 70)}
                      className="w-full bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg shadow-[#d03232]/20"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          {t("upload.processing")}
                        </>
                      ) : (
                        <>
                          <Compress className="w-4 h-4 mr-2" />
                          {t("tools.compress_image")}
                        </>
                      )}
                    </Button>

                    {isProcessing && (
                      <div className="space-y-2">
                        <Progress value={progress} className="w-full" />
                        <p className="text-sm text-gray-400 text-center">
                          {progress}% {t("upload.complete")}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">{t("tools.compressed_result")}</CardTitle>
              </CardHeader>
              <CardContent>
                {compressedImage ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <img
                        src={compressedImage || "/placeholder.svg"}
                        alt="Compressed"
                        className="w-full h-auto rounded-lg shadow-lg border border-gray-700"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-[#d03232] text-white">
                          {compressionRatio}% {t("tools.smaller")}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-800 rounded-lg border border-gray-700">
                      <div className="text-center">
                        <p className="text-sm text-gray-400">{t("tools.original_size")}</p>
                        <p className="text-lg font-semibold text-white">{formatFileSize(originalSize)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400">{t("tools.compressed_size")}</p>
                        <p className="text-lg font-semibold text-[#d03232]">{formatFileSize(compressedSize)}</p>
                      </div>
                    </div>

                    <Button
                      onClick={downloadImage}
                      className="w-full bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg shadow-[#d03232]/20"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t("tools.download_compressed")}
                    </Button>

                    <div className="text-center">
                      <Button
                        asChild
                        variant="outline"
                        className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
                      >
                        <Link href="/donate">
                          <Crown className="w-4 h-4 mr-2" />
                          {t("donate.support_pixel")}
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Compress className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-400">{t("upload.upload_to_see_result")}</p>
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
