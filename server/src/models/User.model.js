import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  uid: String,
  photo: String,
  name: String,
  email: {
    type: String,
    unique: true,
  },
  friends: {
    type: Array,
    default: [],
  },
  requests: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },
  posts: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", UserSchema);
