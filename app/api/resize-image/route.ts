import sharp from "sharp"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const width = formData.get("width") ? Number.parseInt(formData.get("width") as string, 10) : null
    const height = formData.get("height") ? Number.parseInt(formData.get("height") as string, 10) : null
    const fit = (formData.get("fit") as string) || "cover"
    const format = ((formData.get("format") as string) || "png").toLowerCase()

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const img = sharp(buffer).resize({ width, height, fit: fit as any })

    const output =
      format === "webp"
        ? await img.webp().toBuffer()
        : format === "avif"
          ? await img.avif().toBuffer()
          : format === "jpeg" || format === "jpg"
            ? await img.jpeg({ quality: 90 }).toBuffer()
            : await img.png().toBuffer()

    return new NextResponse(output, {
      headers: {
        "Content-Type": `image/${format === "jpg" ? "jpeg" : format}`,
        "Content-Disposition": `attachment; filename="resized.${format}"`,
      },
    })
  } catch (error) {
    console.error("Image resize failed:", error)
    return NextResponse.json({ error: "Image resize failed" }, { status: 500 })
  }
}
