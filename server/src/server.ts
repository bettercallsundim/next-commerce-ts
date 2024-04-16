import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { connectDB } from "./db";
import categoryRoutes from "./routes/categoryRoutes";
import { apiKey, cloudName, signuploadform } from "./utils/cloudinary";
import { errorHandler } from "./utils/errorHandler";
const app = express();

dotenv.config();

//middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(compression());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://social-media-mern-lemon.vercel.app",
      "http://192.168.1.7:3000",
    ],
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.get("/cloudinary-auth", function (req, res, next) {
  const sig = signuploadform();
  res.json({
    signature: sig.signature,
    timestamp: sig.timestamp,
    cloudname: cloudName,
    apiKey: apiKey,
  });
});
app.use("/category", categoryRoutes);
app.use(errorHandler);

//db connection
connectDB();

//start server
app.listen(4000, () => {
  console.log("Server started");
});
