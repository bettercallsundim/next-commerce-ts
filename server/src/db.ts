import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { insertProducts } from "./utils/dummy";
dotenv.config();



export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
