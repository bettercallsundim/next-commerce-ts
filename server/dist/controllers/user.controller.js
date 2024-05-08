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
exports.getAllUser = exports.getUser = exports.signOut = exports.signIn = exports.signUp = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.signUp = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, avatar } = req.body;
    if (!name || !email) {
        throw new errorHandler_1.default(400, "All fields are required");
    }
    const exists = yield User_model_1.default.findOne({ email });
    if (exists) {
        throw new errorHandler_1.default(400, "User already exists");
    }
    else {
        const user = yield User_model_1.default.create({
            name,
            email,
            avatar,
        });
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: user,
        });
    }
}));
exports.signIn = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        throw new errorHandler_1.default(400, "Email is required");
    }
    const user = (yield User_model_1.default.findOne({ email }));
    if (!user) {
        throw new errorHandler_1.default(400, "User not found");
    }
    const token = user.JWT();
    res
        .status(200)
        .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    })
        .json({
        success: true,
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
exports.getAllUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_model_1.default.find();
    res.status(200).json({
        success: true,
        message: "Users found",
        data: users,
    });
}));
