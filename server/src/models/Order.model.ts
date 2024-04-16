import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phone: Number,
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    deliveredAt: Date,
    paidAt: Date,
  },
  {
    timestamps: true,
  }
);

const orderModel = model("Order", orderSchema);
export default orderModel;
