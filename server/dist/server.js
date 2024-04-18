"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const db_1 = require("./db");
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const cloudinary_1 = require("./utils/cloudinary");
const errorHandler_1 = require("./utils/errorHandler");
const app = (0, express_1.default)();
dotenv.config();
//middlewares
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:3000",
        "https://social-media-mern-lemon.vercel.app",
        "http://192.168.1.7:3000",
    ],
    credentials: true,
}));
app.use("/uploads", express_1.default.static("uploads"));
app.disable("x-powered-by");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
//routes
app.get("/cloudinary-auth", function (req, res, next) {
    const sig = (0, cloudinary_1.signuploadform)();
    res.json({
        signature: sig.signature,
        timestamp: sig.timestamp,
        cloudname: cloudinary_1.cloudName,
        apiKey: cloudinary_1.apiKey,
    });
});
app.use("/category", categoryRoutes_1.default);
app.use(errorHandler_1.errorHandler);
//db connection
(0, db_1.connectDB)();
//start server
app.listen(4000, () => {
    console.log("Server started");
});
