"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("../controllers/review.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/create", auth_1.authCheck, review_controller_1.createReview);
router.patch("/edit/:id", auth_1.authCheck, review_controller_1.editReview);
router.delete("/delete/:id", auth_1.authCheck, review_controller_1.deleteReview);
exports.default = router;
