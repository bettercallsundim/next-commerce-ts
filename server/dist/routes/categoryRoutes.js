"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const router = express_1.default.Router();
// router.post("/create", multer("category").single("icon"), createCategoryWithMulter);
router.post("/create", category_controller_1.createCategory);
router.get("/all", category_controller_1.getAllCategories);
router.delete("/delete", category_controller_1.deleteCategory);
exports.default = router;
