"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Product",
            },
            quantity: {
                type: Number,
                default: 1,
            },
            color: String,
            size: String,
        },
    ],
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    phone: Number,
    totalPrice: {
        type: Number,
        required: [true, "Total price is required"],
    },
    orderStatus: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
    deliveredAt: Date,
    paidAt: Date,
}, {
    timestamps: true,
});
const orderModel = (0, mongoose_1.model)("Order", orderSchema);
exports.default = orderModel;
