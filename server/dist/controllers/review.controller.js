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
exports.deleteReview = exports.editReview = exports.createReview = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
const Review_model_1 = __importDefault(require("../models/Review.model"));
const User_model_1 = __importDefault(require("../models/User.model"));
exports.createReview = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { product, rating, comment } = req.body;
    if (!((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id) || !product || !rating) {
        throw new errorHandler_1.default(400, "All fields are required");
    }
    const gotProduct = yield Product_model_1.default.findById(product);
    if (!gotProduct) {
        throw new errorHandler_1.default(404, "Product not found");
    }
    const user = yield User_model_1.default.findById(req.user._id);
    if (!user) {
        throw new errorHandler_1.default(400, "User not found");
    }
    const exists = yield Review_model_1.default.findOne({ user: req.user._id, product });
    if (exists) {
        throw new errorHandler_1.default(400, "Review already exists");
    }
    const review = yield Review_model_1.default.create({
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
}));
exports.editReview = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { rating, comment } = req.body;
    if (!rating || !comment) {
        throw new errorHandler_1.default(400, "All fields are required");
    }
    let review = yield Review_model_1.default.findById(req.params.id);
    if (!review) {
        throw new errorHandler_1.default(404, "Review not found");
    }
    if (review.user.toString() !== ((_b = req.user) === null || _b === void 0 ? void 0 : _b._id)) {
        throw new errorHandler_1.default(403, "You are not authorized to edit this review");
    }
    review = yield Review_model_1.default.findByIdAndUpdate(req.params.id, {
        rating,
        comment,
    });
    res.status(200).json({
        success: true,
        message: "Review updated successfully",
        data: review,
    });
}));
exports.deleteReview = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const review = yield Review_model_1.default.findById(req.params.id);
    if (!review) {
        throw new errorHandler_1.default(404, "Review not found");
    }
    if (review.user.toString() !== ((_c = req.user) === null || _c === void 0 ? void 0 : _c._id)) {
        throw new errorHandler_1.default(403, "You are not authorized to delete this review");
    }
    yield Review_model_1.default.findByIdAndDelete(req.params.id);
    yield Product_model_1.default.findByIdAndUpdate(review.product, {
        $pull: { reviews: req.params.id },
    });
    yield User_model_1.default.findByIdAndUpdate(req.user._id, {
        $pull: { reviews: req.params.id },
    });
    res.status(200).json({
        success: true,
        message: "Review deleted successfully",
    });
}));
