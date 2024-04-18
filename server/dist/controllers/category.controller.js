"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.getAllCategories = exports.createCategory = exports.createCategoryWithMulter = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Category_model_1 = __importDefault(require("../models/Category.model"));
const cloudinary_1 = require("../utils/cloudinary");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.createCategoryWithMulter = (0, express_async_handler_1.default)(async (req, res, next) => {
    const oldCat = await Category_model_1.default.findOne({ name: req.body.name });
    if (oldCat) {
        throw new errorHandler_1.default(400, "Category already exists");
    }
    if (req.file && req.file.path) {
        await (0, cloudinary_1.cloudinaryUpload)(req?.file?.path, "category").then(async (resp) => {
            if (resp.secure_url) {
                const { name, description } = req.body;
                const newCat = new Category_model_1.default({
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
            }
            else {
                throw new errorHandler_1.default(400, "Category creation error");
            }
        });
    }
    else {
        throw new errorHandler_1.default(400, "Category creation error");
    }
});
exports.createCategory = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { name, description, icon: { url, public_id }, } = req.body;
    if (!name || !description || !url || !public_id) {
        throw new errorHandler_1.default(400, "All fields are required");
    }
    const oldCat = await Category_model_1.default.findOne({ name });
    if (oldCat) {
        throw new errorHandler_1.default(400, "Category already exists");
    }
    const newCat = new Category_model_1.default({
        name,
        description,
        icon: {
            url,
            public_id,
        },
    });
    await newCat.save();
    res.status(200).json({
        message: "Category created successfully",
        data: newCat,
    });
});
exports.getAllCategories = (0, express_async_handler_1.default)(async (req, res, next) => {
    const categories = await Category_model_1.default.find();
    res.status(200).json({
        success: true,
        data: categories,
    });
});
exports.deleteCategory = (0, express_async_handler_1.default)(async (req, res, next) => {
    const findCat = await Category_model_1.default.findById(req.body._id);
    if (findCat && findCat.icon && findCat.icon.public_id) {
        await (0, cloudinary_1.deleteCloudinaryUpload)(findCat.icon.public_id).then(async () => {
            await Category_model_1.default.findByIdAndDelete(req.body._id);
            return res.status(200).json({
                success: true,
                message: "Category removed",
            });
        });
    }
    else {
        throw new errorHandler_1.default(400, "Opps, Category delete error, Not found");
    }
});
