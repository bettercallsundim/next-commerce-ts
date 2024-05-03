import asyncHandler from "express-async-handler";
import { Request, Response, NextFunction } from "express";
import OhError from "../utils/errorHandler";
import orderModel from "../models/Order.model";
import productModel from "../models/Product.model";
import { IRequest } from "../middleware/auth";

export const createOrder = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { products, address, phone } = req.body;
    if (!products || !address || !phone) {
      throw new OhError(400, "All fields are required");
    }
    if (!req?.user?._id) {
      throw new OhError(400, "User not found");
    }
    let totalPrice = 0;
    products.forEach(async (product: any) => {
      let foundProduct = await productModel.findById(product.product);
      if (!foundProduct) {
        throw new OhError(404, "Product not found");
      }
      if (foundProduct.stock < product.quantity) {
        throw new OhError(400, "Product out of stock");
      }

      totalPrice += foundProduct.price * product.quantity;
      foundProduct.stock -= product.quantity;
      foundProduct.sold += product.quantity;
      await foundProduct.save();
    });
    const order = await orderModel.create({
      products,
      address,
      phone,
      totalPrice,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      data: order,
    });
  }
);

export const changeOrderStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderStatus } = req.body;
    if (!orderStatus) {
      throw new OhError(400, "Order status is required");
    }
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      throw new OhError(404, "Order not found");
    }
    order.orderStatus = orderStatus;
    await order.save();
    res.status(200).json({
      success: true,
      data: order,
    });
  }
);

export const cancelOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      throw new OhError(404, "Order not found");
    }
    if (order.orderStatus === "Cancelled") {
      throw new OhError(400, "Order already cancelled");
    }
    order.products.forEach(async (product: any) => {
      let foundProduct = await productModel.findById(product.product);
      if (foundProduct) {
        foundProduct.stock += product.quantity;
        foundProduct.sold -= product.quantity;
        await foundProduct.save();
      }
    });
    order.orderStatus = "Cancelled";
    await order.save();
    res.status(200).json({
      success: true,
      data: order,
    });
  }
);

export const getOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await orderModel.find();
    res.status(200).json({
      success: true,
      data: orders,
    });
  }
);

export const getOrder = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const order = await orderModel.findById(req.params.id);
    if (!order) {
      throw new OhError(404, "Order not found");
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  }
);

export const getOrdersByUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await orderModel.find({ user: req.params.id });
    res.status(200).json({
      success: true,
      data: orders,
    });
  }
);
