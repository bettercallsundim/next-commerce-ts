import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getAllCategoriesTree,
  getBreadcrumbs,
  getChildrens,
} from "../controllers/category.controller";
import { roleCheck } from "../middleware/auth";
const router = express.Router();

// router.post("/create", multer("category").single("icon"), createCategoryWithMulter);
router.post("/create", roleCheck("admin"), createCategory);
router.get("/all", getAllCategories);
router.get("/all/tree", getAllCategoriesTree);
router.delete("/delete", roleCheck("admin"), deleteCategory);
router.get("/:categoryId/childrens", getChildrens);
router.get("/:categoryId", getBreadcrumbs);

export default router;
