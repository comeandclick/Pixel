import formidable from "formidable"
import path from "path"
import fs from "fs"

export const formidableConfig = { api: { bodyParser: false } }

export function parseForm(req: Request) {
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
    // Create tmp directory if it doesn't exist
    const tmpDir = path.join(process.cwd(), "tmp")
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true })
    }

    const form = formidable({
      multiples: false,
      keepExtensions: true,
      uploadDir: tmpDir,
    })

    // Convert Request to Node.js IncomingMessage-like object
    const nodeReq = req as any
    form.parse(nodeReq, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })
}
