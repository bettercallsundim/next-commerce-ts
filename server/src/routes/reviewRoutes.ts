import express from "express";

import { createReview, deleteReview, editReview } from "../controllers/review.controller";
import { authCheck } from "../middleware/auth";
const router = express.Router();

router.post("/create", authCheck, createReview);
router.patch("/edit/:id", authCheck, editReview);
router.delete("/delete/:id", authCheck, deleteReview);

export default router;
