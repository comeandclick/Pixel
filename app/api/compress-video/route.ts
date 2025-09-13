import fs from "fs"
import path from "path"
import { type NextRequest, NextResponse } from "next/server"
import ffmpeg from "@/lib/ffmpeg"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const crf = Number.parseInt((formData.get("crf") as string) ?? "28", 10)
    const preset = (formData.get("preset") as string) || "medium"
    const maxWidth = formData.get("maxWidth") ? Number.parseInt(formData.get("maxWidth") as string, 10) : null
    const maxHeight = formData.get("maxHeight") ? Number.parseInt(formData.get("maxHeight") as string, 10) : null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Create tmp directory if it doesn't exist
    const tmpDir = path.join(process.cwd(), "tmp")
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true })
    }

    // Save input file
    const inputPath = path.join(tmpDir, `input-${Date.now()}-${file.name}`)
    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(inputPath, buffer)

    const outputPath = path.join(tmpDir, `compressed-${Date.now()}.mp4`)

    return new Promise((resolve, reject) => {
      const scaleFilter =
        maxWidth || maxHeight
          ? `scale='min(${maxWidth || "iw"},iw)':'min(${maxHeight || "ih"},ih)':force_original_aspect_ratio=decrease`
          : null

      const command = ffmpeg(inputPath)
        .videoCodec("libx264")
        .audioCodec("aac")
        .outputOptions([`-crf ${crf}`, `-preset ${preset}`])

      if (scaleFilter) command.outputOptions([`-vf ${scaleFilter}`])

      command
        .format("mp4")
        .on("end", () => {
          try {
            const outputBuffer = fs.readFileSync(outputPath)

            // Cleanup
            fs.unlink(inputPath, () => {})
            fs.unlink(outputPath, () => {})

            resolve(
              new NextResponse(outputBuffer, {
                headers: {
                  "Content-Type": "video/mp4",
                  "Content-Disposition": 'attachment; filename="compressed.mp4"',
                },
              }),
            )
          } catch (error) {
            reject(NextResponse.json({ error: "Video compression failed" }, { status: 500 }))
          }
        })
        .on("error", (error) => {
          console.error("FFmpeg error:", error)
          // Cleanup on error
          fs.unlink(inputPath, () => {})
          fs.unlink(outputPath, () => {})
          reject(NextResponse.json({ error: "Video compression failed" }, { status: 500 }))
        })
        .save(outputPath)
    })
  } catch (error) {
    console.error("Video compression failed:", error)
    return NextResponse.json({ error: "Video compression failed" }, { status: 500 })
  }
}
