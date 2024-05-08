import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/category.controller";
import {
  cancelOrder,
  changeOrderStatus,
  createOrder,
  getOrder,
  getOrders,
  getOrdersByStatus,
  getOrdersByUser,
} from "../controllers/order.controller";
import { authCheck, roleCheck } from "../middleware/auth";
const router = express.Router();

router.post("/create", authCheck, createOrder);
router.patch(
  "/change-status",
  authCheck,
  roleCheck("admin"),
  changeOrderStatus
);
router.patch("/cancel/:id", authCheck, cancelOrder);
router.get("/:id", authCheck, getOrder);
router.get("/all", authCheck, roleCheck("admin"), getOrders);
router.get("/user/:id", authCheck, getOrdersByUser);
router.get("/:status", authCheck, roleCheck("admin"), getOrdersByStatus);

export default router;
