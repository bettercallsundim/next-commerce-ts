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
exports.deleteCategory = exports.getAllCategories = exports.createCategory = exports.createCategoryWithMulter = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const Category_model_1 = __importDefault(require("../models/Category.model"));
const cloudinary_1 = require("../utils/cloudinary");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.createCategoryWithMulter = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const oldCat = yield Category_model_1.default.findOne({ name: req.body.name });
    if (oldCat) {
        throw new errorHandler_1.default(400, "Category already exists");
    }
    if (req.file && req.file.path) {
        yield (0, cloudinary_1.cloudinaryUpload)((_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path, "category").then((resp) => __awaiter(void 0, void 0, void 0, function* () {
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
                yield newCat.save();
                res.status(200).json({
                    message: "Category created successfully",
                    data: newCat,
                });
            }
            else {
                throw new errorHandler_1.default(400, "Category creation error");
            }
        }));
    }
    else {
        throw new errorHandler_1.default(400, "Category creation error");
    }
}));
exports.createCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, icon: { url, public_id }, } = req.body;
    if (!name || !description || !url || !public_id) {
        throw new errorHandler_1.default(400, "All fields are required");
    }
    const oldCat = yield Category_model_1.default.findOne({ name });
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
    yield newCat.save();
    res.status(200).json({
        message: "Category created successfully",
        data: newCat,
    });
}));
exports.getAllCategories = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield Category_model_1.default.find();
    res.status(200).json({
        success: true,
        data: categories,
    });
}));
exports.deleteCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const findCategory = yield Category_model_1.default.findById(req.body._id);
    if (findCategory && findCategory.icon && findCategory.icon.public_id) {
        yield (0, cloudinary_1.deleteCloudinaryUpload)(findCategory.icon.public_id).then(() => __awaiter(void 0, void 0, void 0, function* () {
            yield Category_model_1.default.findByIdAndDelete(req.body._id);
            return res.status(200).json({
                success: true,
                message: "Category removed",
            });
        }));
    }
    else {
        throw new errorHandler_1.default(400, "Opps, Category delete error, Not found");
    }
}));
