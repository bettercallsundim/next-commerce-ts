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
  address?: string;
  wishlist?: Schema.Types.ObjectId[];
  cart?: CartItem[];
  orders?: Schema.Types.ObjectId[];
  reviews?: Schema.Types.ObjectId[];
  JWT: () => string;
}

export interface IRequest extends Request {
  user?: IUser;
}

export interface OrderItem {
  proudct: Schema.Types.ObjectId;
  quantity: Number;
  color: String;
  size: String;
}

export enum OrderStatus {
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
}
export interface Order extends Document {
  products: OrderItem[];
  user: Schema.Types.ObjectId;
  address: {
    type: String;
    required: [true, "Address is required"];
  };
  phone: string;
  totalPrice: number;
  orderStatus: OrderStatus;
  deliveredAt: Date;
  paidAt: Date;
}



export interface Review extends Document {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  rating: number;
  comment?: string;
}
