"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
    },
    rating: {
        type: Number,
        default: 0,
        required: [true, "Rating is required"],
    },
    comment: {
        type: String,
    },
}, {
    timestamps: true,
});
const reviewModel = (0, mongoose_1.model)("Review", reviewSchema);
exports.default = reviewModel;
