import formidable from "formidable";
import path from "path";

export const formidableConfig = { api: { bodyParser: false } };

export function parseForm(req) {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
    uploadDir: path.join(process.cwd(), "tmp"),
  });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}