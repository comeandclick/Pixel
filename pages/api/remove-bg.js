import fs from "fs";
import sharp from "sharp";
import { pipeline } from "@xenova/transformers";
import { parseForm, formidableConfig } from "../../lib/formidable";

export const config = formidableConfig;

let segmenterPromise;
function getSegmenter() {
  if (!segmenterPromise) {
    segmenterPromise = pipeline("image-segmentation", "Xenova/deeplabv3-resnet50");
  }
  return segmenterPromise;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
  try {
    const { files } = await parseForm(req);
    const file = files.file || files.image || Object.values(files)[0];
    const input = fs.readFileSync(file.filepath);

    const segmenter = await getSegmenter();
    const result = await segmenter(input);
    const mask = result[0].mask; // { data, width, height }

    const out = await sharp(input)
      .resize({ width: mask.width, height: mask.height, fit: "fill" })
      .ensureAlpha()
      .joinChannel(Buffer.from(mask.data), {
        raw: { width: mask.width, height: mask.height, channels: 1 },
      })
      .png()
      .toBuffer();

    res.setHeader("Content-Type", "image/png");
    res.send(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Background removal failed" });
  }
}