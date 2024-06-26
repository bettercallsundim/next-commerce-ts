import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import orderModel from "../models/Order.model";
import productModel from "../models/Product.model";
import userModel from "../models/User.model";
import { IRequest, Order, OrderStatus } from "../types";
import OhError from "../utils/errorHandler";
export const createOrder = asyncHandler(
  async (req: IRequest, res: Response, next: NextFunction) => {
    const { products, address, phone } = req.body;
    if (!products || !address || !phone) {
      throw new OhError(400, "All fields are required");
    }
    if (!req?.user?._id) {
      throw new OhError(400, "User not found");
    }
    const user = await userModel.findById(req.user._id);
    if (!user) {
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
    const order: Order = await orderModel.create({
      products,
      address,
      phone,
      totalPrice,
      user: req?.user?._id,
    });
    if (!order) {
      throw new OhError(400, "Order not created");
    }
    if (!user.orders) {
      user.orders = [];
    }
    user.orders.push(order._id);

    await user.save();
    res.status(201).json({
      success: true,
      message: "Order created successfully",
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
      message: "Order status changed successfully",
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
    if (order.orderStatus === OrderStatus.Cancelled) {
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
    order.orderStatus = OrderStatus.Cancelled;
    await order.save();
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  }
);

export const getOrders = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await orderModel.find();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
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
      message: "Order fetched successfully",
      data: order,
    });
  }
);

export const getOrdersByUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await orderModel.find({ user: req.params.id });
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  }
);

export const getOrdersByStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await orderModel.find({ orderStatus: req.params.status });
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  }
);
