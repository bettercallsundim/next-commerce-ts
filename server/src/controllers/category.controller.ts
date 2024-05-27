import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import categoryModel from "../models/Category.model";
import { cloudinaryUpload, deleteCloudinaryUpload } from "../utils/cloudinary";
import OhError from "../utils/errorHandler";
import mongoose from "mongoose";

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
          const categories = new categoryModel({
            name,
            description,
            icon: {
              url: resp.secure_url,
              public_id: resp.public_id,
            },
          });
          await categories.save();
          res.status(200).json({
            message: "Category created successfully",
            data: categories,
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
    const categories = new categoryModel(categoryData);
    await categories.save();
    if (parentCat) {
      parentCat.childrens.push(categories._id);
      await parentCat.save();
    }
    res.status(200).json({
      message: "Category created successfully",
      data: categories,
    });
  }
);

export const getAllCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // const categories = await categoryModel.find();
    const categories = await categoryModel.aggregate([
      {
        $graphLookup: {
          from: "categories",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parent",
          as: "subcats",
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

// get all categories in tree structure
export const getAllCategoriesTree = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const aggregateCategories = async () => {
      try {
        // Fetch root categories
        const rootCategories = await categoryModel
          .find({ parent: null })
          .lean();

        // Recursively fetch children for each root category
        for (let i = 0; i < rootCategories.length; i++) {
          rootCategories[i].childrens = await fetchChildren(rootCategories[i]);
        }

        return rootCategories;
      } catch (error) {
        console.error("Error aggregating categories:", error);
        throw error;
      }
    };
    const fetchChildren = async (category) => {
      for (let i = 0; i < category.childrens.length; i++) {
        const childId = category.childrens[i];
        const childCategory = await categoryModel.findById(childId).lean();
        if (childCategory) {
          childCategory.childrens = await fetchChildren(childCategory);
          category.childrens[i] = childCategory;
        }
      }
      return category.childrens;
    };
    let cats = await aggregateCategories();
    // aggregateCategories().then((result) => {
    //   console.log(result, "result");
    //   cats=result
    // });
    return res.json({
      categories: cats,
    });
  }
);
// get breadcrumbs/parents of a category
export const getBreadcrumbs = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;
    let category = await categoryModel.findById(categoryId).lean();
    let breadcrumbs = [];
    if (category) {
      breadcrumbs.push(category);
      if (category.parent) {
        await fetchParents(category.parent);
      }
    }

    async function fetchParents(
      parentId: mongoose.Schema.Types.ObjectId | string
    ) {
      let parent = await categoryModel.findById(parentId).lean();
      if (parent) {
        breadcrumbs.push(parent);
        if (parent.parent) {
          await fetchParents(parent.parent);
        } else {
          return;
        }
      }
    }
    breadcrumbs.reverse();
    return res.status(200).json({
      success: true,
      message: "Breadcrumbs fetched successfully",
      breadcrumbs,
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
