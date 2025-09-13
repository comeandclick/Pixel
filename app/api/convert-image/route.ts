import sharp from "sharp"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const format = ((formData.get("format") as string) || "webp").toLowerCase()

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const img = sharp(buffer)

    const output =
      format === "webp"
        ? await img.webp({ quality: 90 }).toBuffer()
        : format === "avif"
          ? await img.avif({ quality: 90 }).toBuffer()
          : format === "jpeg" || format === "jpg"
            ? await img.jpeg({ quality: 90 }).toBuffer()
            : await img.png().toBuffer()

    return new NextResponse(output, {
      headers: {
        "Content-Type": `image/${format === "jpg" ? "jpeg" : format}`,
        "Content-Disposition": `attachment; filename="converted.${format}"`,
      },
    })
  } catch (error) {
    console.error("Image conversion failed:", error)
    return NextResponse.json({ error: "Image conversion failed" }, { status: 500 })
  }
}
