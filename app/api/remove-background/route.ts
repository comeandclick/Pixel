import { type NextRequest, NextResponse } from "next/server"
import Replicate from "replicate"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // Convert file to base64 or upload to a temporary URL
    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")
    const dataUrl = `data:${image.type};base64,${base64}`

    // Use Replicate API to remove background
    const output = await replicate.run("cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003", {
      input: {
        image: dataUrl,
      },
    })

    // The output should be a URL to the processed image
    const imageUrl = Array.isArray(output) ? output[0] : output

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error("Error removing background:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}
