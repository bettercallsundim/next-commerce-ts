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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signuploadform = exports.cloudName = exports.apiSecret = exports.apiKey = void 0;
exports.cloudinaryUpload = cloudinaryUpload;
exports.deleteCloudinaryUpload = deleteCloudinaryUpload;
const cloudinary_1 = require("cloudinary");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
function cloudinaryUpload(file, folder) {
    return cloudinary_1.v2.uploader.upload(file, {
        resource_type: "auto",
        folder: folder,
    });
}
function deleteCloudinaryUpload(public_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return cloudinary_1.v2.uploader.destroy(public_id);
    });
}
const apiKey = cloudinary_1.v2.config().api_key;
exports.apiKey = apiKey;
const apiSecret = cloudinary_1.v2.config().api_secret;
exports.apiSecret = apiSecret;
const cloudName = cloudinary_1.v2.config().cloud_name;
exports.cloudName = cloudName;
const signuploadform = () => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary_1.v2.utils.api_sign_request({
        timestamp: timestamp,
        eager: "",
        folder: "signed_upload_demo_form",
    }, apiSecret);
    return { timestamp, signature };
};
exports.signuploadform = signuploadform;
