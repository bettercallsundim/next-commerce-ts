"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_controller_1 = require("../controllers/category.controller");
const auth_1 = require("../middleware/auth");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// router.post("/create", multer("category").single("icon"), createCategoryWithMulter);
router.post("/create", (0, auth_1.roleCheck)("admin"), category_controller_1.createCategory);
router.get("/all", category_controller_1.getAllCategories);
router.delete("/delete", (0, auth_1.roleCheck)("admin"), category_controller_1.deleteCategory);
exports.default = router;
