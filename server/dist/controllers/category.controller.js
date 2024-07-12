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
exports.deleteCategory = exports.getChildrens = exports.getBreadcrumbs = exports.getAllCategoriesTree = exports.getAllCategories = exports.createCategory = exports.createCategoryWithMulter = void 0;
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
                const categories = new Category_model_1.default({
                    name,
                    description,
                    icon: {
                        url: resp.secure_url,
                        public_id: resp.public_id,
                    },
                });
                yield categories.save();
                res.status(200).json({
                    message: "Category created successfully",
                    data: categories,
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
    const { name, description, icon: { url, public_id }, parent, } = req.body;
    if (!name || !description || !url || !public_id) {
        throw new errorHandler_1.default(400, "All fields are required");
    }
    const oldCat = yield Category_model_1.default.findOne({ name });
    if (oldCat) {
        throw new errorHandler_1.default(400, "Category already exists");
    }
    let parentCat;
    if (parent) {
        parentCat = yield Category_model_1.default.findById(parent);
    }
    if (parent && !parentCat) {
        throw new errorHandler_1.default(400, "Parent category not found");
    }
    let categoryData = {
        name,
        description,
        icon: {
            url,
            public_id,
        },
    };
    if (parentCat) {
        categoryData.parent = parentCat._id;
    }
    const categories = new Category_model_1.default(categoryData);
    yield categories.save();
    if (parentCat) {
        parentCat.childrens.push(categories._id);
        yield parentCat.save();
    }
    res.status(200).json({
        message: "Category created successfully",
        data: categories,
    });
}));
exports.getAllCategories = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const categories = await categoryModel.find();
    const categories = yield Category_model_1.default.aggregate([
        {
            $graphLookup: {
                from: "categories",
                startWith: "$_id",
                connectFromField: "_id",
                connectToField: "parent",
                as: "subcats",
            },
        },
    ]);
    // restrictSearchWithMatch: { childrens: { $exists: true, $ne: [] } },
    res.status(200).json({
        success: true,
        data: categories,
    });
}));
// get all categories in tree structure
exports.getAllCategoriesTree = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const aggregateCategories = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Fetch root categories
            const rootCategories = yield Category_model_1.default
                .find({ parent: null })
                .lean();
            // Recursively fetch children for each root category
            for (let i = 0; i < rootCategories.length; i++) {
                rootCategories[i].childrens = yield fetchChildren(rootCategories[i]);
            }
            return rootCategories;
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
                childCategory.childrens = yield fetchChildren(childCategory);
                category.childrens[i] = childCategory;
            }
        }
        return category.childrens;
    });
    let cats = yield aggregateCategories();
    res.json({
        success: true,
        categories: cats,
    });
}));
// get breadcrumbs/parents of a category
exports.getBreadcrumbs = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    let category = yield Category_model_1.default
        .findById(categoryId)
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
        message: "Breadcrumbs fetched successfully",
        breadcrumbs,
    });
}));
// get breadcrumbs/childs of a category
exports.getChildrens = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryId } = req.params;
    let childCategories = [];
    const aggregateCategories = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const rootCategories = yield Category_model_1.default
                .findById(categoryId)
                .lean();
            if (rootCategories) {
                childCategories.push(rootCategories);
                if ((rootCategories === null || rootCategories === void 0 ? void 0 : rootCategories.childrens.length) > 0) {
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
    res.status(200).json({
        success: true,
        message: "Breadcrumbs childs fetched successfully",
        breadcrumbs: childCategories,
    });
}));
exports.deleteCategory = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const findCategory = yield Category_model_1.default.findById(req.body._id);
    if (findCategory && findCategory.icon && findCategory.icon.public_id) {
        yield (0, cloudinary_1.deleteCloudinaryUpload)(findCategory.icon.public_id);
    }
    findCategory &&
        (yield Category_model_1.default.findByIdAndUpdate(findCategory.parent, {
            $pull: { childrens: findCategory._id },
        }));
    yield Category_model_1.default.findByIdAndDelete(req.body._id);
    res.status(200).json({
        success: true,
        message: "Category removed",
    });
}));
