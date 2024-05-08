import express from "express";
import {
  getAllUser,
  getUser,
  signIn,
  signOut,
  signUp,
} from "../controllers/user.controller";
import { roleCheck } from "../middleware/auth";
const router = express.Router();

// auth routes
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/sign-out", signOut);

// user routes
router.get("/:id", getUser);
router.get("/all",roleCheck("admin"), getAllUser);

export default router;
