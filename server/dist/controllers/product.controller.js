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
exports.getProductsByCategory = exports.getProduct = exports.getProducts = exports.deleteProduct = exports.editProduct = exports.createProduct = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongoose_1 = __importDefault(require("mongoose"));
const Category_model_1 = __importDefault(require("../models/Category.model"));
const Product_model_1 = __importDefault(require("../models/Product.model"));
const cloudinary_1 = require("../utils/cloudinary");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.createProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category, pictures: images, colors, sizes, stock, } = req.body;
    if (!name ||
        !description ||
        !price ||
        !category ||
        images.length < 1 ||
        !(stock >= 0)) {
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
        message: "Product created successfully",
        data: product,
    });
}));
exports.editProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category, images, colors, sizes, stock } = req.body;
    const productFind = yield Product_model_1.default.findById(req.params.id);
    if (!productFind) {
        throw new errorHandler_1.default(404, "Product not found");
    }
    if (productFind && productFind.category !== category) {
        yield Category_model_1.default.findByIdAndUpdate(productFind.category, {
            $pull: { products: req.params.id },
        });
        yield Category_model_1.default.findByIdAndUpdate(category, {
            $push: { products: req.params.id },
        });
    }
    if (productFind) {
        for (let i = 0; i < productFind.images.length; i++) {
            yield (0, cloudinary_1.deleteCloudinaryUpload)(productFind.images[i].public_id);
        }
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
    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: product,
    });
}));
exports.deleteProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_model_1.default.findById(req.params.id);
    if (!product) {
        throw new errorHandler_1.default(404, "Product not found");
    }
    for (let i = 0; i < product.images.length; i++) {
        yield (0, cloudinary_1.deleteCloudinaryUpload)(product.images[i].public_id);
    }
    yield Product_model_1.default.findByIdAndDelete(req.params.id);
    yield Category_model_1.default.findByIdAndUpdate(product.category, {
        $pull: { products: req.params.id },
    });
    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
}));
exports.getProducts = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_model_1.default.find();
    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: products,
    });
}));
exports.getProduct = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_model_1.default.findById(req.params.id).lean();
    if (!product) {
        throw new errorHandler_1.default(404, "Product not found");
    }
    let category = yield Category_model_1.default
        .findById(product.category)
        .lean();
    let breadcrumbs = [];
    if (category) {
        breadcrumbs.push(category);
        if (category.parent) {
            yield fetchParents(category.parent);
        }
    }
    function fetchParents(parentId) {
        return __awaiter(this, void 0, void 0, function* () {
            let parent = yield Category_model_1.default
                .findById(parentId)
                .lean();
            if (parent) {
                breadcrumbs.push(parent);
                if (parent.parent) {
                    yield fetchParents(parent.parent);
                }
                else {
                    return;
                }
            }
        });
    }
    breadcrumbs.reverse();
    res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: Object.assign(Object.assign({}, product), { categories: breadcrumbs }),
    });
}));
exports.getProductsByCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let childCategories = [];
    const aggregateCategories = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rootCategories = yield Category_model_1.default
                .findById(req.params.category)
                .lean();
            if (rootCategories) {
                childCategories.push(rootCategories);
                if (rootCategories.childrens.length > 0) {
                    yield fetchChildren(rootCategories);
                }
            }
            return childCategories;
        }
        catch (error) {
            console.error("Error aggregating categories:", error);
            throw error;
        }
    });
    const fetchChildren = (category) => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 0; i < category.childrens.length; i++) {
            const childId = category.childrens[i];
            const childCategory = yield Category_model_1.default
                .findById(childId)
                .lean();
            if (childCategory) {
                childCategories.push(childCategory);
                childCategory.childrens = yield fetchChildren(childCategory);
            }
        }
        return category.childrens;
    });
    yield aggregateCategories();
    const products = yield Product_model_1.default
        .find({
        category: {
            $in: childCategories.map((cat) => new mongoose_1.default.Types.ObjectId(cat._id)),
        },
    })
        .populate("category");
    if (!products) {
        throw new errorHandler_1.default(404, "Products not found");
    }
    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: products,
    });
}));
