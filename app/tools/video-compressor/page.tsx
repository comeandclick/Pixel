"use client"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, Video, Crown, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useAuth } from "@/components/auth-provider"
import { useLanguage } from "@/components/language-provider"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const qualityPresets = [
  { value: "low", label: "Low (480p)", description: "Smallest file size" },
  { value: "medium", label: "Medium (720p)", description: "Balanced quality and size" },
  { value: "high", label: "High (1080p)", description: "Best quality (Premium)" },
  { value: "ultra", label: "Ultra (4K)", description: "Maximum quality (Premium)" },
]

export default function VideoCompressorPage() {
  const [file, setFile] = useState<File | null>(null)
  const [compressedVideo, setCompressedVideo] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [compressionLevel, setCompressionLevel] = useState([70])
  const [qualityPreset, setQualityPreset] = useState("medium")
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)

  const { user } = useAuth()
  const { t } = useLanguage()
  const { toast } = useToast()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        if (file.size > 100 * 1024 * 1024) {
          // 100MB limit
          toast({
            title: t("common.error"),
            description: "Video file too large (max 100MB)",
            variant: "destructive",
          })
          return
        }

        if (!file.type.startsWith("video/")) {
          toast({
            title: t("common.error"),
            description: t("common.invalid_format"),
            variant: "destructive",
          })
          return
        }

        setFile(file)
        setOriginalSize(file.size)
        setCompressedVideo(null)
        setCompressedSize(0)
      }
    },
    [toast, t],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"],
    },
    multiple: false,
  })

  const compressVideo = async () => {
    if (!file) return

    if ((qualityPreset === "high" || qualityPreset === "ultra") && !user) {
      toast({
        title: t("common.error"),
        description: "High quality compression requires premium account",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 2
      })
    }, 500)

    try {
      // Simulate video compression (in reality, this would use FFmpeg or similar)
      await new Promise((resolve) => setTimeout(resolve, 10000))

      // Create a mock compressed video URL
      const compressedUrl = URL.createObjectURL(file)
      setCompressedVideo(compressedUrl)

      // Calculate mock compressed size based on compression level
      const compressionRatio = compressionLevel[0] / 100
      const mockCompressedSize = Math.round(originalSize * (1 - compressionRatio * 0.7))
      setCompressedSize(mockCompressedSize)

      setProgress(100)

      toast({
        title: t("common.success"),
        description: t("common.processing_complete"),
      })
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Video compression failed. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      clearInterval(interval)
    }
  }

  const downloadVideo = () => {
    if (!compressedVideo) return

    const link = document.createElement("a")
    link.href = compressedVideo
    link.download = `compressed-${qualityPreset}.mp4`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
            <div className="w-16 h-16 bg-gradient-to-br from-[#d03232] to-[#b82828] rounded-2xl flex items-center justify-center mr-4 glow-red">
              <Video className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white">{t("tools.video_compressor")}</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t("tools.video_compressor_desc")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-white">Upload & Compress</CardTitle>
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
                    {isDragActive ? "Drop your video here" : "Drag & drop your video here"}
                  </p>
                  <p className="text-gray-400 mb-4">{t("upload.or")}</p>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                    {t("upload.browse")}
                  </Button>
                  <p className="text-sm text-gray-400 mt-4">Supports MP4, AVI, MOV, WMV, FLV, WebM (max 100MB)</p>
                </div>

                {file && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{file.name}</p>
                        <p className="text-sm text-gray-400">{formatFileSize(originalSize)}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-600 text-white">
                        Ready
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-white mb-3">Quality Preset</h3>
                        <Select value={qualityPreset} onValueChange={setQualityPreset}>
                          <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-black border-gray-800">
                            {qualityPresets.map((preset) => (
                              <SelectItem
                                key={preset.value}
                                value={preset.value}
                                className="text-white hover:bg-gray-800"
                                disabled={!user && (preset.value === "high" || preset.value === "ultra")}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <div>
                                    <div className="font-medium">{preset.label}</div>
                                    <div className="text-sm text-gray-400">{preset.description}</div>
                                  </div>
                                  {!user && (preset.value === "high" || preset.value === "ultra") && (
                                    <Crown className="w-4 h-4 text-[#d03232] ml-2" />
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium text-white">Compression Level</h3>
                          <span className="text-sm text-gray-400">{compressionLevel[0]}%</span>
                        </div>
                        <Slider
                          value={compressionLevel}
                          onValueChange={setCompressionLevel}
                          max={90}
                          min={10}
                          step={5}
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                          <span>High Compression</span>
                          <span>High Quality</span>
                        </div>
                      </div>

                      {!user && (qualityPreset === "high" || qualityPreset === "ultra") && (
                        <div className="flex items-center gap-2 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                          <AlertCircle className="w-4 h-4 text-yellow-500" />
                          <p className="text-sm text-yellow-400">
                            <Link href="/login" className="underline">
                              Login
                            </Link>{" "}
                            to access HD and 4K compression
                          </p>
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={compressVideo}
                      disabled={isProcessing || (!user && (qualityPreset === "high" || qualityPreset === "ultra"))}
                      className="w-full btn-primary"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          {t("upload.processing")}
                        </>
                      ) : (
                        <>
                          <Video className="w-4 h-4 mr-2" />
                          Compress Video
                        </>
                      )}
                    </Button>

                    {isProcessing && (
                      <div className="space-y-2">
                        <Progress value={progress} className="w-full" />
                        <p className="text-sm text-gray-400 text-center">{progress}% complete</p>
                        <p className="text-xs text-gray-500 text-center">This may take several minutes...</p>
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
                <CardTitle className="text-white">Compressed Video</CardTitle>
              </CardHeader>
              <CardContent>
                {compressedVideo ? (
                  <div className="space-y-6">
                    <div className="relative">
                      <video
                        src={compressedVideo}
                        controls
                        className="w-full h-auto rounded-lg shadow-lg"
                        style={{ maxHeight: "300px" }}
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-[#d03232] text-white">{compressionRatio}% smaller</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-900 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Original Size</p>
                        <p className="text-lg font-semibold text-white">{formatFileSize(originalSize)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-400">Compressed Size</p>
                        <p className="text-lg font-semibold text-[#d03232]">{formatFileSize(compressedSize)}</p>
                      </div>
                    </div>

                    <Button onClick={downloadVideo} className="w-full btn-primary">
                      <Download className="w-4 h-4 mr-2" />
                      Download Compressed Video
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
                      <Video className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-400">Upload a video to see the compression result here</p>
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
