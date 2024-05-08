"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("../controllers/product.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/create", (0, auth_1.roleCheck)("admin"), product_controller_1.createProduct);
router.put("/edit", (0, auth_1.roleCheck)("admin"), product_controller_1.editProduct);
router.delete("/delete", (0, auth_1.roleCheck)("admin"), product_controller_1.deleteProduct);
router.get("/:id", product_controller_1.getProduct);
router.get("/all", product_controller_1.getProducts);
router.get("/all/:category", product_controller_1.getProducts);
exports.default = router;
