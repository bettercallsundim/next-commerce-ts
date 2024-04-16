import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";
const isVerified = async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    let decoded = jwt.verify(token, "cat");
    // console.log("your", decoded);
    if (decoded) {
      const user = await UserModel.findOne({ username: decoded.username });
      if (user.isAdmin) {
        next();
      } else {
        res.send("not admin");
      }
    } else {
      res.send("not admin");
    }
  } else {
    res.send("not found token");
  }
};
export default isVerified;
