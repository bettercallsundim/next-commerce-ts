import express from "express";
import * as shopController from "../controllers/shopController";
const router = express.Router();
// create shop account
router.post("/create", shopController.createShop);
