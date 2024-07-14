import dotenv from "dotenv";
import { NextFunction, Response } from "express";
import asyncHandler from "express-async-handler";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import productModel from "../models/Product.model";
import userModel from "../models/User.model";
import { CartItem, IProduct, IRequest, IUser } from "../types";
import OhError from "../utils/errorHandler";
dotenv.config();

export const authCheck = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    if (!req?.cookies?.token) {
      throw new OhError(400, "Token not found");
    }
    let token = req.cookies.token;
    let decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // fetching user from database
    const user = (await userModel.findById(decoded._id).lean()) as IUser;
    // console.log("🚀 ~ user:", user);

    let items = [];

    // populating items in user cart
    user.cart = user.cart || [];
    for (const item of user.cart) {
      let product: IProduct | null = await productModel
        .findById(item.product)
        .lean();
      if (product) {
        let productItem: CartItem = {
          product: "",
          quantity: 0,
        };
        productItem.product = product;
        productItem.quantity = item.quantity || 0;
        // console.log("🚀 ~ productItem:", productItem);
        items.push(productItem);
      }
    }
    user.cart = items;
    if (!user) {
      throw new OhError(400, "User not found");
    }
    req.user = user;
    next();
  }
);

export const roleCheck = (...roles: string[]) => {
  return asyncHandler(
    async (req: IRequest, res: Response, next: NextFunction) => {
      if (req.user && !roles.includes(req.user.role)) {
        throw new OhError(403, "You are not authorized to access this route");
      }
      next();
    }
  );
};
