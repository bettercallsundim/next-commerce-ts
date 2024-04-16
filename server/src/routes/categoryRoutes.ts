import express from "express";
import {
  createCategory,
  createCategoryWithMulter,
  deleteCategory,
  getAllCategories,
} from "../controllers/category.controller";
const router = express.Router();

// router.post("/create", multer("category").single("icon"), createCategoryWithMulter);
router.post("/create", createCategory);
router.get("/all", getAllCategories);
router.delete("/delete", deleteCategory);

export default router;
