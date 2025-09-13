"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { Upload, Download, Video, Loader2 } from "lucide-react"
import { useDropzone } from "react-dropzone"

export default function VideoCompressorPage() {
  const { t } = useLanguage()
  const [originalVideo, setOriginalVideo] = useState<string | null>(null)
  const [processedVideo, setProcessedVideo] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [quality, setQuality] = useState<number>(23)
  const [resolution, setResolution] = useState<string>("original")
  const [currentFile, setCurrentFile] = useState<File | null>(null)

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
      setCurrentFile(file)
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
    if (!currentFile) return

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append("file", currentFile)
      formData.append("quality", quality.toString())
      formData.append("resolution", resolution)

      const response = await fetch("/api/compress-video", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      setProcessedVideo(url)
      setCompressedSize(blob.size)
      setIsProcessing(false)
    } catch (error) {
      console.error("Error compressing video:", error)
      alert("Une erreur s'est produite lors de la compression")
      setIsProcessing(false)
    }
  }

  const downloadVideo = () => {
    if (!processedVideo) return

    const link = document.createElement("a")
    link.href = processedVideo
    link.download = "compressed-video.mp4"
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
                    <Label htmlFor="quality">CRF (Qualité): {quality}</Label>
                    <p className="text-xs text-muted-foreground">Plus bas = meilleure qualité (18-28 recommandé)</p>
                    <Slider
                      id="quality"
                      min={18}
                      max={35}
                      step={1}
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
              <CardDescription>Votre vidéo optimisée</CardDescription>
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
                  <video
                    src={processedVideo}
                    controls
                    className="w-full h-64 rounded-lg bg-muted"
                    style={{ objectFit: "contain" }}
                  />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Taille compressée: {formatFileSize(compressedSize)}</div>
                    <div className="text-green-400">
                      Économie: {formatFileSize(originalSize - compressedSize)} (
                      {Math.round(((originalSize - compressedSize) / originalSize) * 100)}%)
                    </div>
                  </div>
                  <Button onClick={downloadVideo} className="w-full bg-primary hover:bg-primary/90">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger la vidéo
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
