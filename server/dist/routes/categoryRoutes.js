"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// router.post("/create", multer("category").single("icon"), createCategoryWithMulter);
router.get("/:categoryId", category_controller_1.getBreadcrumbs);
router.post("/create", (0, auth_1.roleCheck)("admin"), category_controller_1.createCategory);
router.get("/all", category_controller_1.getAllCategories);
router.get("/all/tree", category_controller_1.getAllCategoriesTree);
router.delete("/delete", (0, auth_1.roleCheck)("admin"), category_controller_1.deleteCategory);
exports.default = router;
