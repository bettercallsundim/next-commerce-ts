import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getAllCategoriesTree,
  getBreadcrumbs,
} from "../controllers/category.controller";
import { roleCheck } from "../middleware/auth";
const router = express.Router();

// router.post("/create", multer("category").single("icon"), createCategoryWithMulter);
router.get("/:categoryId", getBreadcrumbs);
router.post("/create", roleCheck("admin"), createCategory);
router.get("/all", getAllCategories);
router.get("/all/tree", getAllCategoriesTree);
router.delete("/delete", roleCheck("admin"), deleteCategory);

export default router;
