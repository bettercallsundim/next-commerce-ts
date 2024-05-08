"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("../controllers/order.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/create", auth_1.authCheck, order_controller_1.createOrder);
router.patch("/change-status", auth_1.authCheck, (0, auth_1.roleCheck)("admin"), order_controller_1.changeOrderStatus);
router.patch("/cancel/:id", auth_1.authCheck, order_controller_1.cancelOrder);
router.get("/:id", auth_1.authCheck, order_controller_1.getOrder);
router.get("/all", auth_1.authCheck, (0, auth_1.roleCheck)("admin"), order_controller_1.getOrders);
router.get("/user/:id", auth_1.authCheck, order_controller_1.getOrdersByUser);
router.get("/:status", auth_1.authCheck, (0, auth_1.roleCheck)("admin"), order_controller_1.getOrdersByStatus);
exports.default = router;
