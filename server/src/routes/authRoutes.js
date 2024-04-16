import express from "express";
import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
const router = express.Router();

//sign in
router.post("/signin", async (req, res) => {
  console.log("hiiii", req.body);
  const { email, uid, photo, name } = req.body;
  const exists = await User.findOne({ uid });
  if (exists) {
    const token = jwt.sign(
      {
        uid,
      },
      "cat",
      {
        expiresIn: 3600,
      }
    );
    console.log(token);
    return res
      .cookie("jwt", token, {
        // httpOnly: true,
        // secure: false,
        // sameSite: "strict",
      })
      .json({
        success: true,
        message: "Login Success!",
        token,
      });
  } else {
    const user = new User({
      uid,
      photo,
      name,
      email,
    });
    await user.save();
    const token = jwt.sign(
      {
        uid,
      },
      "cat",
      {
        expiresIn: 3600,
      }
    );
    // console.log(token);
    return res
      .cookie("jwt", token, {
        // httpOnly: true,
        // secure: false,
        // sameSite: "strict",
      })
      .json({
        success: true,
        message: "Login Success!",
        token,
      });
  }
});
//sign out
router.get("/signout", async (req, res) => {
  return res.cookie("jwt", "").json({
    success: true,
    message: "Logout Success!",
  });
});

export default router;
