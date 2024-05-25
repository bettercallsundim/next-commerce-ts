import { Schema, model } from "mongoose";
import { Review } from "../types";

const reviewSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    rating: {
      type: Number,
      default: 0,
      required: [true, "Rating is required"],
    },
    comment: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const reviewModel = model<Review>("Review", reviewSchema);
export default reviewModel;
