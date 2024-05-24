// import { IUser } from "../controllers/user.controller";

// export {};

// declare global {
//   namespace Express {
//     export interface Request {
//       user?: IUser;
//     }
//   }
// }
import { Request } from "express";
import { Document, Schema } from "mongoose";

export type CartItem = {
  proudctId: Schema.Types.ObjectId;
  quantity: Number;
};

export interface IUser extends Document {
  name: string;
  email: string;
  role: "user" | "admin";
  avatar: string;
  address: string;
  wishlist: Schema.Types.ObjectId[];
  cart: CartItem[];
  orders: Schema.Types.ObjectId[];
  reviews: Schema.Types.ObjectId[];
  JWT: () => string;
}

export interface IRequest extends Request {
  user?: IUser;
}
