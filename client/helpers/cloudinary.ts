import { myAxios } from "@/hooks/queries";

export const signForm = async () => {
  await myAxios.get(`/cloudinary-auth`).then((res) => {
    return res.data;
  });
};
