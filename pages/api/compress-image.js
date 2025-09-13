import fs from "fs";
import sharp from "sharp";
import { parseForm, formidableConfig } from "../../lib/formidable";
export const config = formidableConfig;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
  try {
    const { fields, files } = await parseForm(req);
    const quality = parseInt(fields.quality ?? "75", 10); // 1-100
    const format = (fields.format || "webp").toLowerCase(); // webp|avif|jpeg|png
    const input = fs.readFileSync(files.file.filepath);

    let img = sharp(input).withMetadata(false);
    if (format === "webp") img = img.webp({ quality });
    else if (format === "avif") img = img.avif({ quality });
    else if (format === "jpeg" || format === "jpg") img = img.jpeg({ quality, mozjpeg: true });
    else img = img.png({ compressionLevel: 9 });

    const out = await img.toBuffer();
    res.setHeader("Content-Type", `image/${format === "jpg" ? "jpeg" : format}`);
    res.send(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Image compression failed" });
  }
}