import fs from "fs";
import sharp from "sharp";
import { parseForm, formidableConfig } from "../../lib/formidable";
export const config = formidableConfig;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
  try {
    const { fields, files } = await parseForm(req);
    const width = fields.width ? parseInt(fields.width, 10) : null;
    const height = fields.height ? parseInt(fields.height, 10) : null;
    const fit = fields.fit || "cover"; // cover|contain|fill|inside|outside
    const format = (fields.format || "png").toLowerCase();

    const input = fs.readFileSync(files.file.filepath);
    let img = sharp(input).resize({ width, height, fit });

    const out =
      format === "webp" ? await img.webp().toBuffer()
      : format === "avif" ? await img.avif().toBuffer()
      : format === "jpeg" || format === "jpg" ? await img.jpeg({ quality: 90 }).toBuffer()
      : await img.png().toBuffer();

    res.setHeader("Content-Type", `image/${format === "jpg" ? "jpeg" : format}`);
    res.send(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Image resize failed" });
  }
}