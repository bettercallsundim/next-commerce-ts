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
router.post("/sign-up", user_controller_1.signUp);
router.post("/sign-in", user_controller_1.signIn);
router.get("/sign-out", user_controller_1.signOut);
// user routes
router.get("/:id", user_controller_1.getUser);
router.get("/all", (0, auth_1.roleCheck)("admin"), user_controller_1.getAllUser);
exports.default = router;
