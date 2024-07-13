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
import mongoose, { Document, Schema } from "mongoose";

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

export interface ICategory extends Document {
  name: string;
  description: string;
  icon: Icon;
  products: Schema.Types.ObjectId[];
  parent: Schema.Types.ObjectId | null;
  childrens: Schema.Types.ObjectId[] | ICategory[];
}

export interface Review extends Document {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  rating: number;
  comment?: string;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: Schema.Types.ObjectId;
  images: Image[];
  colors: Color[];
  sizes: Size[];
  stock: number;
  sold: number;
  rating: number;
  reviews: Review[];
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

interface Image {
  url: string;
  public_id: string;
}

interface Color {
  name: string;
  code: string;
}

interface Size {
  type: "XS" | "S" | "M" | "L" | "XL" | "XXL";
}

interface Icon {
  url: string;
  public_id: string;
}

export type CartItem = {
  product?: string | Schema.Types.ObjectId | mongoose.Types.ObjectId | IProduct;
  _id?: string | Schema.Types.ObjectId | mongoose.Types.ObjectId;
  quantity: number;
};
