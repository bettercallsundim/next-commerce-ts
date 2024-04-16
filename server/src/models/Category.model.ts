import mongoose, { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: String,
  description: String,
  icon: {
    url: String,
    public_id: String,
  },
  proudcts: {
    type: [mongoose.Types.ObjectId],
    ref: "Product",
    default: [],
  },
});

const categoryModel = model("Category", categorySchema);
export default categoryModel;
