"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByStatus = exports.getOrdersByUser = exports.getOrder = exports.getOrders = exports.cancelOrder = exports.changeOrderStatus = exports.createOrder = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Order_model_1 = __importDefault(require("../models/Order.model"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
const types_1 = require("../types");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.createOrder = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { products, address, phone } = req.body;
    if (!products || !address || !phone) {
        throw new errorHandler_1.default(400, "All fields are required");
    }
    if (!((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id)) {
        throw new errorHandler_1.default(400, "User not found");
    }
    const user = yield User_model_1.default.findById(req.user._id);
    if (!user) {
        throw new errorHandler_1.default(400, "User not found");
    }
    let totalPrice = 0;
    products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
        let foundProduct = yield Product_model_1.default.findById(product.product);
        if (!foundProduct) {
            throw new errorHandler_1.default(404, "Product not found");
        }
        if (foundProduct.stock < product.quantity) {
            throw new errorHandler_1.default(400, "Product out of stock");
        }
        totalPrice += foundProduct.price * product.quantity;
        foundProduct.stock -= product.quantity;
        foundProduct.sold += product.quantity;
        yield foundProduct.save();
    }));
    const order = yield Order_model_1.default.create({
        products,
        address,
        phone,
        totalPrice,
        user: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id,
    });
    if (!order) {
        throw new errorHandler_1.default(400, "Order not created");
    }
    if (!user.orders) {
        user.orders = [];
    }
    user.orders.push(order._id);
    yield user.save();
    res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
    });
}));
exports.changeOrderStatus = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderStatus } = req.body;
    if (!orderStatus) {
        throw new errorHandler_1.default(400, "Order status is required");
    }
    const order = yield Order_model_1.default.findById(req.params.id);
    if (!order) {
        throw new errorHandler_1.default(404, "Order not found");
    }
    order.orderStatus = orderStatus;
    yield order.save();
    res.status(200).json({
        success: true,
        message: "Order status changed successfully",
        data: order,
    });
}));
exports.cancelOrder = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_model_1.default.findById(req.params.id);
    if (!order) {
        throw new errorHandler_1.default(404, "Order not found");
    }
    if (order.orderStatus === types_1.OrderStatus.Cancelled) {
        throw new errorHandler_1.default(400, "Order already cancelled");
    }
    order.products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
        let foundProduct = yield Product_model_1.default.findById(product.product);
        if (foundProduct) {
            foundProduct.stock += product.quantity;
            foundProduct.sold -= product.quantity;
            yield foundProduct.save();
        }
    }));
    order.orderStatus = types_1.OrderStatus.Cancelled;
    yield order.save();
    res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        data: order,
    });
}));
exports.getOrders = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_model_1.default.find();
    res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        data: orders,
    });
}));
exports.getOrder = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield Order_model_1.default.findById(req.params.id);
    if (!order) {
        throw new errorHandler_1.default(404, "Order not found");
    }
    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: order,
    });
}));
exports.getOrdersByUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_model_1.default.find({ user: req.params.id });
    res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        data: orders,
    });
}));
exports.getOrdersByStatus = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield Order_model_1.default.find({ orderStatus: req.params.status });
    res.status(200).json({
        success: true,
        message: "Orders fetched successfully",
        data: orders,
    });
}));
