import { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function (req: Request, res: Response) {
  const { file } = req.params;
  const imagePath = path.join(__dirname, "..", "static", file);
  return res.sendFile(imagePath);
}
