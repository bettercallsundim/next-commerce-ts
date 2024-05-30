import express from "express";
import {
  authPersist,
  getAllUser,
  getUser,
  manageCart,
  signIn,
  signOut,
} from "../controllers/user.controller";
import { authCheck, roleCheck } from "../middleware/auth";
const router = express.Router();

// auth routes
router.post("/sign-in", signIn);
router.get("/sign-out", authCheck, signOut);
router.get("/authPersist", authCheck, authPersist);

// user routes
router.get("/:id", authCheck, getUser);
router.post("/manage-cart", authCheck, manageCart);
router.get("/all", authCheck, roleCheck("admin"), getAllUser);

export default router;
