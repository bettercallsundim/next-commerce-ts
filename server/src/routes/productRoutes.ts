import express from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
  getProducts,
  getProductsByCategory,
} from "../controllers/product.controller";
import { authCheck, roleCheck } from "../middleware/auth";
const router = express.Router();

router.post("/create", authCheck, roleCheck("admin"), createProduct);
router.put("/edit", authCheck, roleCheck("admin"), editProduct);
router.delete("/delete", authCheck, roleCheck("admin"), deleteProduct);
router.get("/all", getProducts);
router.get("/all/:category", getProductsByCategory);
router.get("/:id", getProduct);

export default router;
