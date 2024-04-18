
import userModel from "@/models/User.model";
import OhError from "@/utils/errorHandler";
import { IUser } from "controllers/user.controller";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
dotenv.config();

export const authCheck = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.token) {
      throw new OhError(400, "Token not found");
    }
    let token = req.cookies.token;
    let decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    const user = (await userModel.findById(decoded._id)) as IUser;
    if (!user) {
      throw new OhError(400, "User not found");
    }
    req.user = user;
    next();
  }
);

export const roleCheck = (...roles: string[]) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.user && !roles.includes(req.user.role)) {
        throw new OhError(403, "You are not authorized to access this route");
      }
      next();
    }
  );
};
