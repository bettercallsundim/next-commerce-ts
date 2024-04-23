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
exports.roleCheck = exports.authCheck = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
exports.authCheck = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies.token) {
        throw new errorHandler_1.default(400, "Token not found");
    }
    let token = req.cookies.token;
    let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    const user = (yield User_model_1.default.findById(decoded._id));
    if (!user) {
        throw new errorHandler_1.default(400, "User not found");
    }
    req.user = user;
    next();
}));
const roleCheck = (...roles) => {
    return (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (req.user && !roles.includes(req.user.role)) {
            throw new errorHandler_1.default(403, "You are not authorized to access this route");
        }
        next();
    }));
};
exports.roleCheck = roleCheck;