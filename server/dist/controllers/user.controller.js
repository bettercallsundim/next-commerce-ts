"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_model_1 = __importDefault(require("../models/User.model"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.signUp = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { name, email, avatar } = req.body;
    if (!name || !email) {
        throw new errorHandler_1.default(400, "All fields are required");
    }
    const exists = await User_model_1.default.findOne({ email });
    if (exists) {
        throw new errorHandler_1.default(400, "User already exists");
    }
    else {
        const user = await User_model_1.default.create({
            name,
            email,
            avatar,
        });
        res.status(201).json({
            success: true,
            data: user,
        });
    }
});
exports.signIn = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        throw new errorHandler_1.default(400, "Email is required");
    }
    const user = (await User_model_1.default.findOne({ email }));
    if (!user) {
        throw new errorHandler_1.default(400, "User not found");
    }
    const token = user.JWT();
    res
        .cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    })
        .json({
        success: true,
        message: "Signed In Successfully !",
    });
});
