import fs from "fs";
import sharp from "sharp";
import { parseForm, formidableConfig } from "../../lib/formidable";
export const config = formidableConfig;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
  try {
    const { fields, files } = await parseForm(req);
    const format = (fields.format || "webp").toLowerCase(); // webp|avif|png|jpeg
    const input = fs.readFileSync(files.file.filepath);
    let img = sharp(input);

    const out =
      format === "webp" ? await img.webp({ quality: 90 }).toBuffer()
      : format === "avif" ? await img.avif({ quality: 90 }).toBuffer()
      : format === "jpeg" || format === "jpg" ? await img.jpeg({ quality: 90 }).toBuffer()
      : await img.png().toBuffer();

    res.setHeader("Content-Type", `image/${format === "jpg" ? "jpeg" : format}`);
    res.send(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Image convert failed" });
  }
}