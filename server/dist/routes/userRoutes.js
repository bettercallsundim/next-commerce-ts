"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// auth routes
router.post("/sign-in", user_controller_1.signIn);
router.get("/sign-out", auth_1.authCheck, user_controller_1.signOut);
router.get("/authPersist", auth_1.authCheck, user_controller_1.authPersist);
// user routes
router.get("/:id", auth_1.authCheck, user_controller_1.getUser);
router.post("/manage-cart", auth_1.authCheck, user_controller_1.manageCart);
router.get("/all", auth_1.authCheck, (0, auth_1.roleCheck)("admin"), user_controller_1.getAllUser);
exports.default = router;
