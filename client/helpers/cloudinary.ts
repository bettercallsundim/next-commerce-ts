import axios from "axios";

export const signForm = async () => {
  await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND}/cloudinary-auth`)
    .then((res) => {
      return res.data;
    });
};
