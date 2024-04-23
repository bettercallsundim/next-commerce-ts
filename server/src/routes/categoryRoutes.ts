import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/category.controller";
import { roleCheck } from "../middleware/auth";
import express from "express";
const router = express.Router();

// router.post("/create", multer("category").single("icon"), createCategoryWithMulter);
router.post("/create", roleCheck("admin"), createCategory);
router.get("/all", getAllCategories);
router.delete("/delete", roleCheck("admin"), deleteCategory);

export default router;
