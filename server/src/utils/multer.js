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
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importStar(require("multer"));
function default_1(folderName) {
    const uploadDestination = `uploads/${folderName}`;
    // Create the destination directory if it doesn't exist
    if (!fs_1.default.existsSync(uploadDestination)) {
        fs_1.default.mkdirSync(uploadDestination, { recursive: true });
    }
    return (0, multer_1.default)({
        storage: (0, multer_1.diskStorage)({
            destination: function (req, file, callback) {
                callback(null, uploadDestination);
            },
            filename: function (req, { originalname }, callback) {
                callback(null, `${Date.now().toString()}.${originalname.split(".").at(-1)}`);
            },
        }),
        fileFilter(_, file, callback) {
            callback(undefined, file.mimetype.includes("image/") || file.mimetype.includes("video/"));
        },
    });
}
exports.default = default_1;
