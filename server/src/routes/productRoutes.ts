import express from "express";

import {
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
} from "../controllers/product.controller";
import { roleCheck } from "../middleware/auth";
const router = express.Router();

router.post("/create", roleCheck("admin"), createProduct);
router.put("/edit", roleCheck("admin"), editProduct);
router.delete("/delete", roleCheck("admin"), deleteProduct);
router.get("/:id", getProduct);
router.get("/all", getProducts);
router.get("/all/:category", getProducts);

export default router;
