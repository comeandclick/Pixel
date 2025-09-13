"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Download, Scissors, Crown, AlertCircle, Clipboard } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function BackgroundRemovalPage() {
  const [file, setFile] = useState<File | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
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
        setProcessedImage(null)
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
            setProcessedImage(null)
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

  // Background removal using Replicate API
  const processImage = async () => {
    if (!file) return

    setIsProcessing(true)
    setProgress(0)

    try {
      // Convert file to base64 for API
      const formData = new FormData()
      formData.append("image", file)

      // Progress simulation
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      // Call background removal API
      const response = await fetch("/api/remove-background", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error("Failed to process image")
      }

      const result = await response.json()

      if (result.success && result.imageUrl) {
        setProcessedImage(result.imageUrl)
        setProgress(100)

        toast({
          title: t("common.success"),
          description: t("common.processing_complete"),
        })
      } else {
        throw new Error(result.error || "Processing failed")
      }
    } catch (error) {
      console.error("Background removal error:", error)
      toast({
        title: t("common.error"),
        description: t("upload.processing_failed"),
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  // Fixed download function
  const downloadImage = async () => {
    if (!processedImage) return

    try {
      const response = await fetch(processedImage)
      const blob = await response.blob()

      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `background-removed-${selectedQuality}-${Date.now()}.png`
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
              <Scissors className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">{t("tools.bg_removal")}</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("tools.bg_removal_desc")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Card className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white">{t("upload.title")}</CardTitle>
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
                        <p className="text-sm text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <Badge className="bg-green-600 text-white">{t("upload.ready")}</Badge>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-medium text-white">{t("quality.output_quality")}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div
                          onClick={() => setSelectedQuality("free")}
                          className={`p-4 rounded-lg cursor-pointer border transition-all ${
                            selectedQuality === "free"
                              ? "border-[#d03232] bg-[#d03232]/10"
                              : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-white">{t("quality.free")}</span>
                            <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                              720p
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400">{t("quality.free_desc")}</p>
                        </div>

                        <div
                          onClick={() => (user ? setSelectedQuality("premium") : null)}
                          className={`p-4 rounded-lg cursor-pointer border transition-all ${
                            selectedQuality === "premium"
                              ? "border-[#d03232] bg-[#d03232]/10"
                              : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                          } ${!user ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium flex items-center text-white">
                              {t("quality.premium")}
                              <Crown className="w-4 h-4 ml-1 text-[#d03232]" />
                            </span>
                            <Badge className="bg-[#d03232] text-white">1080p</Badge>
                          </div>
                          <p className="text-sm text-gray-400">
                            {user ? t("quality.premium_desc") : t("quality.login_required")}
                          </p>
                        </div>
                      </div>

                      {!user && (
                        <div className="flex items-center gap-2 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          <p className="text-sm text-yellow-400">
                            <Link href="/login" className="underline hover:text-yellow-300">
                              {t("auth.login")}
                            </Link>{" "}
                            {t("quality.hd_access")}
                          </p>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={processImage}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg shadow-[#d03232]/20"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          {t("upload.processing")}
                        </>
                      ) : (
                        <>
                          <Scissors className="w-4 h-4 mr-2" />
                          {t("tools.remove_background")}
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
                <CardTitle className="text-white">{t("upload.result")}</CardTitle>
              </CardHeader>
              <CardContent>
                {processedImage ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <img
                        src={processedImage || "/placeholder.svg"}
                        alt="Processed"
                        className="w-full h-auto rounded-lg shadow-lg border border-gray-700"
                        style={{ backgroundColor: "transparent" }}
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 text-white">
                          {selectedQuality === "premium" ? "HD" : t("quality.standard")}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      onClick={downloadImage}
                      className="w-full bg-gradient-to-r from-[#d03232] to-[#b82828] hover:from-[#b82828] hover:to-[#a02626] text-white font-medium py-3 rounded-lg transition-all duration-300 shadow-lg shadow-[#d03232]/20"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {selectedQuality === "premium" ? t("upload.download_hd") : t("upload.download")}
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
                      <Scissors className="w-12 h-12 text-gray-400" />
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
