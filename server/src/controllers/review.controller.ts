import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import OhError from "../utils/errorHandler";
import productModel from "../models/Product.model";
import categoryModel from "../models/Category.model";
import { deleteCloudinaryUpload } from "../utils/cloudinary";
import { IRequest } from "../middleware/auth";
import reviewModel from "../models/Review.model";
import userModel from "../models/User.model";

export const createReview = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { product, rating, comment } = req.body;
    if (!req?.user?._id || !product || !rating) {
      throw new OhError(400, "All fields are required");
    }
    const gotProduct = await productModel.findById(product);
    if (!gotProduct) {
      throw new OhError(404, "Product not found");
    }
    const user = await userModel.findById(req.user._id);
    if (!user) {
      throw new OhError(400, "User not found");
    }
    const exists = await reviewModel.findOne({ user: req.user._id, product });
    if (exists) {
      throw new OhError(400, "Review already exists");
    }

    const review = await reviewModel.create({
      user: req.user._id,
      product,
      rating,
      comment,
    });
    product.reviews.push(review._id);
    user.reviews.push(review._id);
    Promise.all([product.save(), user.save()]);
    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  }
);

export const editReview = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      throw new OhError(400, "All fields are required");
    }

    let review = await reviewModel.findById(req.params.id);

    if (!review) {
      throw new OhError(404, "Review not found");
    }

    if (review.user.toString() !== req.user?._id) {
      throw new OhError(403, "You are not authorized to edit this review");
    }

    review = await reviewModel.findByIdAndUpdate(req.params.id, {
      rating,
      comment,
    });

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  }
);

export const deleteReview = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const review = await reviewModel.findById(req.params.id);
    if (!review) {
      throw new OhError(404, "Review not found");
    }
    if (review.user.toString() !== req.user?._id) {
      throw new OhError(403, "You are not authorized to delete this review");
    }
    await reviewModel.findByIdAndDelete(req.params.id);
    await productModel.findByIdAndUpdate(review.product, {
      $pull: { reviews: req.params.id },
    });
    await userModel.findByIdAndUpdate(req.user._id, {
      $pull: { reviews: req.params.id },
    });

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  }
);
