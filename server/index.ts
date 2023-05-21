import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { shouldSendSameSiteNone } from "should-send-same-site-none";
import router from "./router/index.js";
import { PrismaClient } from "@prisma/client";
import errorHandler from "./middlewares/error-handler.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
export const prisma = new PrismaClient();

app.set("trust proxy", 1);
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    allowedHeaders: "*",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(shouldSendSameSiteNone);
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
