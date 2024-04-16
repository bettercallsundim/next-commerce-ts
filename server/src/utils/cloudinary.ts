import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});
function cloudinaryUpload(file: string, folder: string) {
  return cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: folder,
  });
}
function deleteCloudinaryUpload(public_id: string) {
  return cloudinary.uploader.destroy(public_id);
}

const apiKey: string = cloudinary.config().api_key as string;
const apiSecret: string = cloudinary.config().api_secret as string;
const cloudName: string = cloudinary.config().cloud_name as string;

const signuploadform = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      eager: "",
      folder: "signed_upload_demo_form",
    },
    apiSecret as string
  );

  return { timestamp, signature };
};

export {
  apiKey,
  apiSecret,
  cloudName,
  cloudinaryUpload,
  deleteCloudinaryUpload,
  signuploadform,
};
