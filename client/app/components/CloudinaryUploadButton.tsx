"use client";
import { CldUploadButton } from "next-cloudinary";

import React from "react";

type Props = {
  cb: (info: any) => void;
};

const CloudinaryUploadButton = ({ cb }: Props) => {
  return (
    <CldUploadButton
      onSuccess={(res) => {
        cb(res.info);
      }}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
    />
  );
};

export default CloudinaryUploadButton;
