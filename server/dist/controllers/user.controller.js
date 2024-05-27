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
exports.getAllUser = exports.manageCart = exports.getUser = exports.signOut = exports.signIn = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_model_1 = __importDefault(require("../models/User.model"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.signIn = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, picture: avatar } = req.body;
    if (!name || !email || !avatar) {
        throw new errorHandler_1.default(400, "All fields are required");
    }
    let user = yield User_model_1.default.findOne({ email });
    if (!user) {
        user = yield User_model_1.default.create({
            name,
            email,
            avatar,
            role: "user",
        });
    }
    if (!user) {
        throw new errorHandler_1.default(400, "User not created");
    }
    const token = user.JWT();
    res
        .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: true,
    })
        .json({
        success: true,
        user,
        message: "Signed In Successfully !",
    });
}));
exports.signOut = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .status(200)
        .cookie("token", "", {
        httpOnly: true,
        maxAge: 1,
    })
        .json({
        success: true,
        message: "Signed Out Successfully !",
    });
}));
exports.getUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        throw new errorHandler_1.default(400, "User ID is required");
    }
    const user = yield User_model_1.default.findById(id);
    if (!user) {
        throw new errorHandler_1.default(404, "User not found");
    }
    res.status(200).json({
        success: true,
        message: "User found",
        data: user,
    });
}));
exports.manageCart = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const cart = req.body.cart;
    const user = yield User_model_1.default.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!user) {
        throw new errorHandler_1.default(404, "User not found");
    }
    user.cart = cart;
    yield user.save();
    res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        data: user,
    });
}));
exports.getAllUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_model_1.default.find();
    res.status(200).json({
        success: true,
        message: "Users found",
        data: users,
    });
}));
