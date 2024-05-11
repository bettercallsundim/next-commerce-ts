import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: String,
  description: String,
  icon: {
    url: String,
    public_id: String,
  },
  proudcts: {
    type: [Schema.Types.ObjectId],
    ref: "Product",
    default: [],
  },
  parent:{
    type: Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  childrens: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const categoryModel = model("Category", categorySchema);
export default categoryModel;
