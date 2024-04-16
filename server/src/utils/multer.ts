import fs from "fs";
import multer, { diskStorage } from "multer";
export default function (folderName: string) {
  const uploadDestination = `uploads/${folderName}`;

  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(uploadDestination)) {
    fs.mkdirSync(uploadDestination, { recursive: true });
  }
  return multer({
    storage: diskStorage({
      destination: function (req, file, callback) {
        callback(null, uploadDestination);
      },

      filename: function (req, { originalname }, callback) {
        callback(
          null,
          `${Date.now().toString()}.${originalname.split(".").at(-1)}`
        );
      },
    }),

    fileFilter(_, file, callback) {
      callback(
        undefined as any,
        file.mimetype.includes("image/") || file.mimetype.includes("video/")
      );
    },
  });
}
