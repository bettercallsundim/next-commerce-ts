"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Product category is required"],
    },
    images: [
        {
            url: String,
            public_id: String,
        },
    ],
    colors: [
        {
            name: String,
            code: String,
        },
    ],
    sizes: [
        {
            type: String,
            enum: ["XS", "S", "M", "L", "XL", "XXL"],
        },
    ],
    stock: {
        type: Number,
        required: [true, "Product stock is required"],
    },
    sold: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
});
const productModel = (0, mongoose_1.model)("Product", productSchema);
exports.default = productModel;
