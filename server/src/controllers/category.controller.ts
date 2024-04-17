import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import categoryModel from "../models/Category.model";
import { cloudinaryUpload, deleteCloudinaryUpload } from "../utils/cloudinary";
import OhError from "../utils/errorHandler";
export const createCategoryWithMulter = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const oldCat = await categoryModel.findOne({ name: req.body.name });
    if (oldCat) {
      throw new OhError(400, "Category already exists");
    }
    if (req.file && req.file.path) {
      await cloudinaryUpload(req?.file?.path, "category").then(async (resp) => {
        if (resp.secure_url) {
          const { name, description } = req.body;
          const newCat = new categoryModel({
            name,
            description,
            icon: {
              url: resp.secure_url,
              public_id: resp.public_id,
            },
          });
          await newCat.save();
          res.status(200).json({
            message: "Category created successfully",
            data: newCat,
          });
        } else {
          throw new OhError(400, "Category creation error");
        }
      });
    } else {
      throw new OhError(400, "Category creation error");
    }
  }
);
export const createCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      description,
      icon: { url, public_id },
    } = req.body;
    if (!name || !description || !url || !public_id) {
      throw new OhError(400, "All fields are required");
    }
    const oldCat = await categoryModel.findOne({ name });
    if (oldCat) {
      throw new OhError(400, "Category already exists");
    }

    const newCat = new categoryModel({
      name,
      description,
      icon: {
        url,
        public_id,
      },
    });
    await newCat.save();
    res.status(200).json({
      message: "Category created successfully",
      data: newCat,
    });
  }
);

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await categoryModel.find();
    res.status(200).json({
      success: true,
      data: categories,
    });
  }
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const findCat = await categoryModel.findById(req.body._id);
    if (findCat && findCat.icon && findCat.icon.public_id) {
      await deleteCloudinaryUpload(findCat.icon.public_id).then(async () => {
        await categoryModel.findByIdAndDelete(req.body._id);
        return res.status(200).json({
          success: true,
          message: "Category removed",
        });
      });
    } else {
      throw new OhError(400, "Opps, Category delete error, Not found");
    }
  }
);
