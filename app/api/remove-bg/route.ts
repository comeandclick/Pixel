import { type NextRequest, NextResponse } from "next/server"
import sharp from "sharp"
import { pipeline } from "@xenova/transformers"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 })
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    console.log("[v0] Loading AI segmentation model...")
    const segmenter = await pipeline("image-segmentation", "Xenova/deeplabv3-resnet50")

    console.log("[v0] Processing image with AI model...")
    // Process the image with the AI model
    const result = await segmenter(buffer)

    console.log("[v0] AI processing complete, found", result.length, "segments")

    let selectedMask = result.find((r: any) => r.label === "person")

    if (!selectedMask && result.length > 0) {
      // If no person found, use the largest mask (likely the main subject)
      selectedMask = result.reduce((largest: any, current: any) => {
        const currentSize = current.mask.width * current.mask.height
        const largestSize = largest.mask.width * largest.mask.height
        return currentSize > largestSize ? current : largest
      })
      console.log("[v0] No person detected, using largest segment:", selectedMask.label)
    }

    if (!selectedMask) {
      return NextResponse.json(
        { error: "No suitable object detected in image for background removal" },
        { status: 400 },
      )
    }

    // Get image metadata
    const metadata = await sharp(buffer).metadata()
    console.log("[v0] Image metadata:", { width: metadata.width, height: metadata.height, format: metadata.format })

    try {
      // Create alpha channel from mask
      const maskData = new Uint8Array(selectedMask.mask.data)

      // Convert mask to proper format for Sharp
      const maskBuffer = await sharp(Buffer.from(maskData), {
        raw: {
          width: selectedMask.mask.width,
          height: selectedMask.mask.height,
          channels: 1,
        },
      })
        .resize(metadata.width || 512, metadata.height || 512)
        .toBuffer()

      console.log("[v0] Applying mask to image...")

      // Process image with Sharp to apply the mask
      const processedBuffer = await sharp(buffer)
        .ensureAlpha()
        .composite([
          {
            input: maskBuffer,
            blend: "dest-in",
          },
        ])
        .png()
        .toBuffer()

      console.log("[v0] Background removal complete")

      return new NextResponse(processedBuffer, {
        headers: {
          "Content-Type": "image/png",
          "Content-Disposition": 'attachment; filename="background-removed.png"',
          "Cache-Control": "no-cache",
        },
      })
    } catch (maskError) {
      console.error("[v0] Mask processing error:", maskError)
      return NextResponse.json(
        {
          error: "Failed to process image mask",
          details: maskError instanceof Error ? maskError.message : "Mask processing failed",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("[v0] Background removal error:", error)
    return NextResponse.json(
      {
        error: "Failed to process image",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
