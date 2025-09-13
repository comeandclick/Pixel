import sharp from "sharp"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const quality = Number.parseInt((formData.get("quality") as string) ?? "75", 10)
    const format = ((formData.get("format") as string) || "webp").toLowerCase()

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    let img = sharp(buffer).withMetadata(false)

    if (format === "webp") img = img.webp({ quality })
    else if (format === "avif") img = img.avif({ quality })
    else if (format === "jpeg" || format === "jpg") img = img.jpeg({ quality, mozjpeg: true })
    else img = img.png({ compressionLevel: 9 })

    const output = await img.toBuffer()

    return new NextResponse(output, {
      headers: {
        "Content-Type": `image/${format === "jpg" ? "jpeg" : format}`,
        "Content-Disposition": `attachment; filename="compressed.${format}"`,
      },
    })
  } catch (error) {
    console.error("Image compression failed:", error)
    return NextResponse.json({ error: "Image compression failed" }, { status: 500 })
  }
}
