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
exports.editProduct = exports.createProduct = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
const Category_model_1 = __importDefault(require("../models/Category.model"));
exports.createProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category, images, colors, sizes, stock } = req.body;
    if (!name ||
        !description ||
        !price ||
        !category ||
        !images ||
        !colors ||
        !sizes ||
        !stock) {
        throw new errorHandler_1.default(400, "All fields are required");
    }
    const product = yield Product_model_1.default.create({
        name,
        description,
        price,
        category,
        images,
        colors,
        sizes,
        stock,
    });
    yield Category_model_1.default.findByIdAndUpdate(category, {
        $push: { products: product._id },
    });
    res.status(201).json({
        success: true,
        data: product,
    });
}));
exports.editProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category, images, colors, sizes, stock } = req.body;
    const productFind = yield Product_model_1.default.findById(req.params.id);
    if (productFind && productFind.category !== category) {
        yield Category_model_1.default.findByIdAndUpdate(productFind.category, {
            $pull: { products: req.params.id },
        });
        yield Category_model_1.default.findByIdAndUpdate(category, {
            $push: { products: req.params.id },
        });
    }
    const product = yield Product_model_1.default.findByIdAndUpdate(req.params.id, {
        name,
        description,
        price,
        category,
        images,
        colors,
        sizes,
        stock,
    }, { new: true });
    if (!product) {
        throw new errorHandler_1.default(404, "Product not found");
    }
    res.status(200).json({
        success: true,
        data: product,
    });
}));
