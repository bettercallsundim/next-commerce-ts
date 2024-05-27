"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: String,
    description: String,
    icon: {
        url: String,
        public_id: String,
    },
    proudcts: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Product",
        default: [],
    },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        default: null,
    },
    childrens: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Category",
        },
    ],
});
const categoryModel = (0, mongoose_1.model)("Category", categorySchema);
exports.default = categoryModel;
