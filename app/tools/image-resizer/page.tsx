"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Download, Maximize, Crown, AlertCircle, LinkIcon } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const presets = [
  { name: "Instagram Square", width: 1080, height: 1080 },
  { name: "Instagram Story", width: 1080, height: 1920 },
  { name: "Facebook Cover", width: 1200, height: 630 },
  { name: "Twitter Header", width: 1500, height: 500 },
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
  { name: "LinkedIn Banner", width: 1584, height: 396 },
]

export default function ImageResizerPage() {
  const [file, setFile] = useState<File | null>(null)
  const [resizedImage, setResizedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 })

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
        setResizedImage(null)

        // Get original dimensions
        const img = new Image()
        img.onload = () => {
          setOriginalDimensions({ width: img.width, height: img.height })
          setWidth(img.width.toString())
          setHeight(img.height.toString())
        }
        img.src = URL.createObjectURL(file)
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

  const handleWidthChange = (value: string) => {
    setWidth(value)
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const aspectRatio = originalDimensions.height / originalDimensions.width
      setHeight(Math.round(Number.parseInt(value) * aspectRatio).toString())
    }
  }

  const handleHeightChange = (value: string) => {
    setHeight(value)
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const aspectRatio = originalDimensions.width / originalDimensions.height
      setWidth(Math.round(Number.parseInt(value) * aspectRatio).toString())
    }
  }

  const applyPreset = (preset: { width: number; height: number }) => {
    setWidth(preset.width.toString())
    setHeight(preset.height.toString())
  }

  const resizeImage = async () => {
    if (!file || !width || !height) return

    const targetWidth = Number.parseInt(width)
    const targetHeight = Number.parseInt(height)

    if (targetWidth > 4000 || targetHeight > 4000) {
      if (!user) {
        toast({
          title: t("common.error"),
          description: "Large dimensions require premium account",
          variant: "destructive",
        })
        return
      }
    }

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
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        canvas.width = targetWidth
        canvas.height = targetHeight
        ctx?.drawImage(img, 0, 0, targetWidth, targetHeight)

        const resizedDataUrl = canvas.toDataURL("image/png")
        setResizedImage(resizedDataUrl)
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
        description: "Resizing failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      clearInterval(interval)
    }
  }

  const downloadImage = () => {
    if (!resizedImage) return

    const link = document.createElement("a")
    link.href = resizedImage
    link.download = `resized-${width}x${height}.png`
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
              <Maximize className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">{t("tools.image_resizer")}</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("tools.image_resizer_desc")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white">Upload & Resize</CardTitle>
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
                  <p className="text-sm text-gray-400 mt-4">Supports PNG, JPG, JPEG, WebP (max 10MB)</p>
                </div>

                {file && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{file.name}</p>
                        <p className="text-sm text-gray-400">
                          {originalDimensions.width} × {originalDimensions.height}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-green-600 text-white">
                        Ready
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-white">Quick Presets</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {presets.map((preset, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => applyPreset(preset)}
                            className="text-xs border-gray-600 text-white hover:bg-gray-800"
                          >
                            {preset.name}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white">Custom Dimensions</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                          className="text-gray-400 hover:text-white"
                        >
                          <LinkIcon className={`w-4 h-4 ${maintainAspectRatio ? "text-[#d03232]" : ""}`} />
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="width" className="text-white">
                            Width (px)
                          </Label>
                          <Input
                            id="width"
                            type="number"
                            value={width}
                            onChange={(e) => handleWidthChange(e.target.value)}
                            className="input-dark"
                            placeholder="Width"
                          />
                        </div>
                        <div>
                          <Label htmlFor="height" className="text-white">
                            Height (px)
                          </Label>
                          <Input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => handleHeightChange(e.target.value)}
                            className="input-dark"
                            placeholder="Height"
                          />
                        </div>
                      </div>

                      {!user && (Number.parseInt(width) > 4000 || Number.parseInt(height) > 4000) && (
                        <div className="flex items-center gap-2 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          <p className="text-sm text-yellow-400">
                            <Link href="/login" className="underline">
                              Login
                            </Link>{" "}
                            to resize images larger than 4000px
                          </p>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={resizeImage}
                      disabled={
                        isProcessing ||
                        !width ||
                        !height ||
                        (!user && (Number.parseInt(width) > 4000 || Number.parseInt(height) > 4000))
                      }
                      className="w-full btn-primary"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          {t("upload.processing")}
                        </>
                      ) : (
                        <>
                          <Maximize className="w-4 h-4 mr-2" />
                          Resize Image
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
                <CardTitle className="text-white">Resized Image</CardTitle>
              </CardHeader>
              <CardContent>
                {resizedImage ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <img
                        src={resizedImage || "/placeholder.svg"}
                        alt="Resized"
                        className="w-full h-auto rounded-lg shadow-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-[#d03232] text-white">
                          {width} × {height}
                        </Badge>
                      </div>
                    </div>

                    <Button onClick={downloadImage} className="w-full btn-primary">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resized
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
                      <Maximize className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-400">Upload an image to see the resized result here</p>
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
