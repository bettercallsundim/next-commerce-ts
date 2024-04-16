import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import helmet from "helmet";
import multer from "multer";
import { connectDB } from "./db";
import categoryRoutes from "./routes/categoryRoutes";
import { apiKey, cloudName, signuploadform } from "./utils/cloudinary";
import { errorHandler } from "./utils/errorHandler";
// import authRoutes from "./routes/authRoutes.js";
// import postRoutes from "./routes/postRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads"); // Save files in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix); // Use original fieldname with a unique suffix
  },
});
const multerUpload = multer({ storage });
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
// using this API should require authentication
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
// app.use("/auth", authRoutes);
// app.use("/post", postRoutes);
// app.use("/user", userRoutes);
app.post(
  "/fileUpload",
  multerUpload.single("photo"),
  (req: Request, res: Response) => {
    if (req.file) {
      const file = req.file;
      console.log(file);
      res.json({ msg: "ok" });
    } else {
      res.status(400).json({ msg: "No file uploaded" });
    }
  }
);
app.use(errorHandler);
//db connection
connectDB();
app.listen(4000, () => {
  console.log("Server started");
});
