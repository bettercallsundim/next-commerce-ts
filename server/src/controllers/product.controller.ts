import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import OhError from "../utils/errorHandler";
import productModel from "../models/Product.model";
import categoryModel from "../models/Category.model";
import { deleteCloudinaryUpload } from "../utils/cloudinary";

export const createProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, category, images, colors, sizes, stock } =
      req.body;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !images ||
      !colors ||
      !sizes ||
      !stock
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
      data: product,
    });
  }
);

export const editProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, category, images, colors, sizes, stock } =
      req.body;
    const productFind = await productModel.findById(req.params.id);
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
    if (!product) {
      throw new OhError(404, "Product not found");
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      throw new OhError(404, "Product not found");
    }
    await categoryModel.findByIdAndUpdate(product.category, {
      $pull: { products: req.params.id },
    });
    res.status(200).json({
      success: true,
    });
  }
);

export const getProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await productModel.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  }
);

export const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      throw new OhError(404, "Product not found");
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  }
);

export const getProductsByCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await productModel.find({ category: req.params.id });
    if (!products) {
      throw new OhError(404, "Products not found");
    }
    res.status(200).json({
      success: true,
      data: products,
    });
  }
);
