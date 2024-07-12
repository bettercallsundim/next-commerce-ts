import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import categoryModel from "../models/Category.model";
import productModel from "../models/Product.model";
import { ICategory, IProduct } from "../types";
import { deleteCloudinaryUpload } from "../utils/cloudinary";
import OhError from "../utils/errorHandler";
export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      name,
      description,
      price,
      category,
      pictures: images,
      colors,
      sizes,
      stock,
    } = req.body;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      images.length < 1 ||
      !(stock >= 0)
    ) {
      throw new OhError(400, "All fields are required");
    }
   
    const product = await productModel.create({
      name,
      description,
      price,
      category,
      images,
      colors,
      sizes,
      stock,
    });
    await categoryModel.findByIdAndUpdate(category, {
      $push: { products: product._id },
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  }
);

export const editProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, category, images, colors, sizes, stock } =
      req.body;

    const productFind = await productModel.findById(req.params.id);

    if (!productFind) {
      throw new OhError(404, "Product not found");
    }

    if (productFind && productFind.category !== category) {
      await categoryModel.findByIdAndUpdate(productFind.category, {
        $pull: { products: req.params.id },
      });
      await categoryModel.findByIdAndUpdate(category, {
        $push: { products: req.params.id },
      });
    }

    if (productFind) {
      for (let i = 0; i < productFind.images.length; i++) {
        await deleteCloudinaryUpload(productFind.images[i].public_id as string);
      }
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        images,
        colors,
        sizes,
        stock,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productModel.findById(req.params.id);

    if (!product) {
      throw new OhError(404, "Product not found");
    }

    for (let i = 0; i < product.images.length; i++) {
      await deleteCloudinaryUpload(product.images[i].public_id as string);
    }

    await productModel.findByIdAndDelete(req.params.id);

    await categoryModel.findByIdAndUpdate(product.category, {
      $pull: { products: req.params.id },
    });

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  }
);

export const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await productModel.find();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  }
);

export const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productModel.findById(req.params.id).lean();
    if (!product) {
      throw new OhError(404, "Product not found");
    }
    let category: ICategory | null = await categoryModel
      .findById(product.category)
      .lean();
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
      let parent: ICategory | null = await categoryModel
        .findById(parentId)
        .lean();
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
    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: {
        ...product,
        categories: breadcrumbs,
      },
    });
  }
);

export const getProductsByCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let childCategories: ICategory[] = [];
    const aggregateCategories = async () => {
      try {
        const rootCategories: ICategory | null = await categoryModel
          .findById(req.params.category)
          .lean();
        if (rootCategories) {
          childCategories.push(rootCategories);
          if (rootCategories.childrens.length > 0) {
            await fetchChildren(rootCategories);
          }
        }
        return childCategories;
      } catch (error) {
        console.error("Error aggregating categories:", error);
        throw error;
      }
    };
    const fetchChildren = async (category: ICategory) => {
      for (let i = 0; i < category.childrens.length; i++) {
        const childId = category.childrens[i];
        const childCategory: ICategory | null = await categoryModel
          .findById(childId)
          .lean();
        if (childCategory) {
          childCategories.push(childCategory);

          childCategory.childrens = await fetchChildren(childCategory);
        }
      }
      return category.childrens;
    };
    await aggregateCategories();
    const products: IProduct[] = await productModel
      .find({
        category: {
          $in: childCategories.map(
            (cat) => new mongoose.Types.ObjectId(cat._id)
          ),
        },
      })
      .populate("category");
    if (!products) {
      throw new OhError(404, "Products not found");
    }
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  }
);
