import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import redis from "./config/redis";
import { connectDB } from "./db";
import categoryRoutes from "./routes/categoryRoutes";
import orderRoutes from "./routes/orderRoutes";
import productRoutes from "./routes/productRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import userRoutes from "./routes/userRoutes";
import { apiKey, cloudName, signuploadform } from "./utils/cloudinary";
import { errorHandler } from "./utils/errorHandler";

const app = express();

dotenv.config();
redis
  .connect()
  .then(() => {
    console.log("Redis connected");
  })
  .catch((err) => {
    console.log("Redis connection failed", err);
  });
//middlewares
app.use(
  cors({
    origin: [process.env.FRONTEND as string],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(compression());

app.use("/uploads", express.static("uploads"));
app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/review", reviewRoutes);

app.use(errorHandler);

//db connection
connectDB();

//start server
app.listen(4000, () => {
  console.log("Server started");
});
