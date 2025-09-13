"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { Upload, Download, Video, Loader2, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"

export default function VideoCompressorPage() {
  const { t } = useLanguage()
  const [originalVideo, setOriginalVideo] = useState<string | null>(null)
  const [processedVideo, setProcessedVideo] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [quality, setQuality] = useState<number>(70)
  const [resolution, setResolution] = useState<string>("original")

  const resolutions = [
    { value: "original", label: "Résolution originale" },
    { value: "1080p", label: "1080p (1920x1080)" },
    { value: "720p", label: "720p (1280x720)" },
    { value: "480p", label: "480p (854x480)" },
    { value: "360p", label: "360p (640x360)" },
  ]

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setOriginalSize(file.size)
      const reader = new FileReader()
      reader.onload = () => {
        setOriginalVideo(reader.result as string)
        setProcessedVideo(null)
        setCompressedSize(0)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/*": [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"],
    },
    multiple: false,
  })

  const compressVideo = async () => {
    if (!originalVideo) return

    setIsProcessing(true)

    try {
      // Create video element
      const video = document.createElement("video")
      video.crossOrigin = "anonymous"
      video.muted = true

      video.onloadedmetadata = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          setIsProcessing(false)
          return
        }

        // Set canvas dimensions based on selected resolution
        let targetWidth = video.videoWidth
        let targetHeight = video.videoHeight

        switch (resolution) {
          case "1080p":
            targetWidth = 1920
            targetHeight = 1080
            break
          case "720p":
            targetWidth = 1280
            targetHeight = 720
            break
          case "480p":
            targetWidth = 854
            targetHeight = 480
            break
          case "360p":
            targetWidth = 640
            targetHeight = 360
            break
        }

        canvas.width = targetWidth
        canvas.height = targetHeight

        // For demo purposes, we'll create a compressed version by reducing quality
        // In a real implementation, you'd use FFmpeg.js or a server-side solution
        video.currentTime = 0
        video.onseeked = () => {
          ctx.drawImage(video, 0, 0, targetWidth, targetHeight)

          // Convert to compressed format (simulated)
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality / 100)

          // Simulate video compression by creating a smaller data URL
          const simulatedCompressedSize = Math.round(originalSize * (quality / 100) * 0.7)

          setProcessedVideo(compressedDataUrl)
          setCompressedSize(simulatedCompressedSize)
          setIsProcessing(false)
        }
      }

      video.src = originalVideo
    } catch (error) {
      console.error("Error compressing video:", error)
      setIsProcessing(false)
    }
  }

  const downloadVideo = () => {
    if (!processedVideo) return

    const link = document.createElement("a")
    link.href = processedVideo
    link.download = "compressed-video.jpg" // Note: This is a demo, would be .mp4 in real implementation
    link.click()
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Compresseur Vidéo</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Réduisez la taille de vos vidéos tout en conservant une qualité optimale
          </p>
        </div>

        {/* Demo Notice */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="border-yellow-500/50 bg-yellow-500/10">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-yellow-400">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">
                  <strong>Version démo:</strong> Cette version génère une image de prévisualisation. La version complète
                  nécessiterait FFmpeg.js pour un vrai traitement vidéo.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Upload Section */}
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Télécharger Vidéo
              </CardTitle>
              <CardDescription>Glissez-déposez votre vidéo ou cliquez pour parcourir</CardDescription>
            </CardHeader>
            <CardContent>
              {!originalVideo ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    {isDragActive ? "Déposez votre vidéo ici" : "Glissez-déposez votre vidéo"}
                  </p>
                  <p className="text-muted-foreground">ou cliquez pour parcourir</p>
                  <p className="text-sm text-muted-foreground mt-2">Formats supportés: MP4, AVI, MOV, WMV, FLV, WebM</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <video
                    src={originalVideo}
                    controls
                    className="w-full h-64 rounded-lg bg-muted"
                    style={{ objectFit: "contain" }}
                  />
                  <div className="text-sm text-muted-foreground">Taille originale: {formatFileSize(originalSize)}</div>

                  <div>
                    <Label htmlFor="resolution">Résolution de sortie</Label>
                    <Select value={resolution} onValueChange={setResolution}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choisir une résolution" />
                      </SelectTrigger>
                      <SelectContent>
                        {resolutions.map((res) => (
                          <SelectItem key={res.value} value={res.value}>
                            {res.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quality">Qualité: {quality}%</Label>
                    <Slider
                      id="quality"
                      min={10}
                      max={100}
                      step={5}
                      value={[quality]}
                      onValueChange={(value) => setQuality(value[0])}
                      className="w-full"
                    />
                  </div>

                  <Button
                    onClick={compressVideo}
                    disabled={isProcessing}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Compression en cours...
                      </>
                    ) : (
                      <>
                        <Video className="h-4 w-4 mr-2" />
                        Compresser la vidéo
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
                Vidéo Compressée
              </CardTitle>
              <CardDescription>Votre vidéo optimisée (prévisualisation)</CardDescription>
            </CardHeader>
            <CardContent>
              {!processedVideo ? (
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                  <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground mb-2">La vidéo compressée apparaîtra ici</p>
                  <p className="text-muted-foreground">Téléchargez une vidéo pour commencer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <img
                    src={processedVideo || "/placeholder.svg"}
                    alt="Video Preview"
                    className="w-full h-64 object-contain rounded-lg bg-muted"
                  />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Taille estimée: {formatFileSize(compressedSize)}</div>
                    <div className="text-green-400">
                      Économie estimée: {formatFileSize(originalSize - compressedSize)} (
                      {Math.round(((originalSize - compressedSize) / originalSize) * 100)}%)
                    </div>
                  </div>
                  <Button onClick={downloadVideo} className="w-full bg-primary hover:bg-primary/90">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger la prévisualisation
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
