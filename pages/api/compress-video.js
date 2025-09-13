import fs from "fs";
import path from "path";
import { parseForm, formidableConfig } from "../../lib/formidable";
import ffmpeg from "../../lib/ffmpeg";
export const config = formidableConfig;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });

  try {
    const { fields, files } = await parseForm(req);
    const file = files.file || Object.values(files)[0];
    const inputPath = file.filepath;
    const crf = parseInt(fields.crf ?? "28", 10); // 18-28 (plus haut = +compressé)
    const preset = fields.preset || "medium"; // ultrafast..veryslow
    const maxWidth = fields.maxWidth ? parseInt(fields.maxWidth, 10) : null;
    const maxHeight = fields.maxHeight ? parseInt(fields.maxHeight, 10) : null;

    const outPath = path.join(path.dirname(inputPath), `compressed-${path.basename(inputPath, path.extname(inputPath))}.mp4`);

    const scaleFilter = (maxWidth || maxHeight)
      ? `scale='min(${maxWidth || "iw"},iw)':'min(${maxHeight || "ih"},ih)':force_original_aspect_ratio=decrease`
      : null;

    const command = ffmpeg(inputPath).videoCodec("libx264").audioCodec("aac")
      .outputOptions([`-crf ${crf}`, `-preset ${preset}`]);

    if (scaleFilter) command.outputOptions([`-vf ${scaleFilter}`]);

    command.format("mp4")
      .on("end", () => {
        const buf = fs.readFileSync(outPath);
        res.setHeader("Content-Type", "video/mp4");
        res.send(buf);
        fs.unlink(outPath, () => {});
      })
      .on("error", (e) => {
        console.error(e);
        res.status(500).json({ error: "Video compression failed" });
      })
      .save(outPath);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Video compression failed" });
  }
}