import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { Document, Schema } from "mongoose";
import userModel from "../models/User.model";
import OhError from "../utils/errorHandler";

interface Cart {
  product: Schema.Types.ObjectId;
  quantity: number;
}

interface IUser extends Document {
  name: string;
  email: string;
  role: "user" | "admin";
  avatar: string;
  address: string;
  wishlist: Schema.Types.ObjectId[];
  cart: Cart[];
  orders: Schema.Types.ObjectId[];
  reviews: Schema.Types.ObjectId[];
  JWT: () => string;
}


export const signUp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, avatar } = req.body;
    if (!name || !email) {
      throw new OhError(400, "All fields are required");
    }
    const exists = await userModel.findOne({ email });
    if (exists) {
      throw new OhError(400, "User already exists");
    } else {
      const user = await userModel.create({
        name,
        email,
        avatar,
      });
      res.status(201).json({
        success: true,
        data: user,
      });
    }
  }
);

export const signIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) {
      throw new OhError(400, "Email is required");
    }
    const user = (await userModel.findOne({ email })) as IUser;

    if (!user) {
      throw new OhError(400, "User not found");
    }

    const token = user.JWT();

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .json({
        success: true,
        message: "Signed In Successfully !",
      });
  }
);
