import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import userModel from "../models/User.model";
import { CartItem, IRequest, IUser } from "../types/express";
import OhError from "../utils/errorHandler";

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
        message: "User created successfully",
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
      .status(200)
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

export const signOut = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res
      .status(200)
      .cookie("token", "", {
        httpOnly: true,
        maxAge: 1,
      })
      .json({
        success: true,
        message: "Signed Out Successfully !",
      });
  }
);

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    if (!id) {
      throw new OhError(400, "User ID is required");
    }
    const user = await userModel.findById(id);
    if (!user) {
      throw new OhError(404, "User not found");
    }
    res.status(200).json({
      success: true,
      message: "User found",
      data: user,
    });
  }
);

export const manageCart = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const cart: CartItem[] | [] = req.body.cart;

    const user: IUser | null = await userModel.findById(req?.user?._id);
    if (!user) {
      throw new OhError(404, "User not found");
    }

    user.cart = cart;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: user,
    });
  }
);

export const getAllUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userModel.find();
    res.status(200).json({
      success: true,
      message: "Users found",
      data: users,
    });
  }
);
