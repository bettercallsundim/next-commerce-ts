import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    post: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    photo: {
      type: String,
    },
    author: {
      type: "String",
      required: true,
    },
    authorName: {
      type: "String",
      required: true,
    },
    authorPic: {
      type: String,
      default: "",
    },
    comments: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema);
