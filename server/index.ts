import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import router from "./router/index.js";
import { PrismaClient } from "@prisma/client";
import errorHandler from "./middlewares/error-handler.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
export const prisma = new PrismaClient();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    exposedHeaders: ["set-cookie"],
  })
);
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.get("/healthz", (req, res) => {
  return res.sendStatus(200);
});

app.get("/static/:file", async (req, res) => {
  // i had some troubles with express.static. it didnt sent images at all. i didnt find out what was the problem, so i made my own static serve
  const { file } = req.params;
  const imagePath = path.join(__dirname, "static", file);
  return res.sendFile(imagePath);
});

app.use("/api", router);

app.use(errorHandler);
const start = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`running on ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
