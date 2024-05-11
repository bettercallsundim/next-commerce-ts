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
      parent,
    } = req.body;
    if (!name || !description || !url || !public_id) {
      throw new OhError(400, "All fields are required");
    }
    const oldCat = await categoryModel.findOne({ name });
    if (oldCat) {
      throw new OhError(400, "Category already exists");
    }
    let parentCat;
    if (parent) {
      parentCat = await categoryModel.findById(parent);
    }
    if (parent && !parentCat) {
      throw new OhError(400, "Parent category not found");
    }
    let categoryData: any = {
      name,
      description,
      icon: {
        url,
        public_id,
      },
    };
    if (parentCat) {
      categoryData.parent = parentCat._id;
    }
    const newCat = new categoryModel(categoryData);
    await newCat.save();
    if (parentCat) {
      parentCat.childrens.push(newCat._id);
      await parentCat.save();
    }
    res.status(200).json({
      message: "Category created successfully",
      data: newCat,
    });
  }
);

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await categoryModel.aggregate([
      {
        $graphLookup: {
          from: "categories",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parent",
          as: "subcategories",
          maxDepth: 5,
        },
      },
    ]);
    // restrictSearchWithMatch: { childrens: { $exists: true, $ne: [] } },

    res.status(200).json({
      success: true,
      data: categories,
    });
  }
);
export const getAllCategoriesTree = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const categories = await categoryModel.aggregate([
      {
        $match: {
          parent: null, // Filter to select only categories with parent equal to null
        },
      },
      {
        $graphLookup: {
          from: "categories",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parent",
          as: "subcategories",
          maxDepth: 5,
        },
      },
    ]);
    // restrictSearchWithMatch: { childrens: { $exists: true, $ne: [] } },

    res.status(200).json({
      success: true,
      data: categories,
    });
  }
);

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const findCategory = await categoryModel.findById(req.body._id);
    if (findCategory && findCategory.icon && findCategory.icon.public_id) {
      await deleteCloudinaryUpload(findCategory.icon.public_id);
    }
    findCategory &&
      (await categoryModel.findByIdAndUpdate(findCategory.parent, {
        $pull: { childrens: findCategory._id },
      }));

    await categoryModel.findByIdAndDelete(req.body._id);
    res.status(200).json({
      success: true,
      message: "Category removed",
    });
  }
);
