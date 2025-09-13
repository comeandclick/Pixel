"use client"
import { useState } from "react"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload, Download } from "lucide-react"

interface UploadClientProps {
  endpoint: string
  accept?: string
  title: string
  description: string
  extraFields?: Array<{
    name: string
    label: string
    type: "select" | "number" | "text"
    options?: string[]
    defaultValue?: string
    placeholder?: string
  }>
}

export default function UploadClient({
  endpoint,
  accept = "image/*",
  title,
  description,
  extraFields = [],
}: UploadClientProps) {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append("file", file)

    // Add extra field values
    Object.entries(fieldValues).forEach(([key, value]) => {
      if (value) formData.append(key, value)
    })

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setResult(url)
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Une erreur s'est produite lors du traitement")
    } finally {
      setLoading(false)
    }
  }

  function handleDownload() {
    if (!result) return
    const a = document.createElement("a")
    a.href = result
    a.download = `processed-${Date.now()}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="text-2xl gradient-text">{title}</CardTitle>
          <p className="text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="file">Sélectionner un fichier</Label>
              <Input
                id="file"
                type="file"
                accept={accept}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mt-2"
                required
              />
            </div>

            {extraFields.map((field) => (
              <div key={field.name}>
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === "select" ? (
                  <Select
                    value={fieldValues[field.name] || field.defaultValue || ""}
                    onValueChange={(value) => setFieldValues((prev) => ({ ...prev, [field.name]: value }))}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={fieldValues[field.name] || field.defaultValue || ""}
                    onChange={(e) => setFieldValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                    className="mt-2"
                  />
                )}
              </div>
            ))}

            <Button type="submit" disabled={!file || loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement en cours...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Traiter le fichier
                </>
              )}
            </Button>
          </form>

          {result && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Résultat</h3>
                <Button onClick={handleDownload} variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
              </div>

              {accept.startsWith("image") ? (
                <img
                  src={result || "/placeholder.svg"}
                  alt="Résultat traité"
                  className="max-w-full rounded-lg border"
                />
              ) : (
                <video src={result} controls className="w-full rounded-lg border" />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
