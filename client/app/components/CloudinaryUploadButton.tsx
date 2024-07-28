"use client";
import { CldUploadButton } from "next-cloudinary";

import React from "react";

type Props = {
  cb: (info: any) => void;
};

const CloudinaryUploadButton = ({ cb }: Props) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  return (
    <CldUploadButton
      className="bg-slate-200 rounded-md px-4 py-2 cursor-pointer outline-none border-none"
      onSuccess={(res) => {
        cb(res.info);
      }}
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
    />
  );
};

export default CloudinaryUploadButton;
