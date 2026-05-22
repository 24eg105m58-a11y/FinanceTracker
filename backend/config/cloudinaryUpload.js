import cloudinary from "./cloudinary.js";

export const uploadToCloudinary = (buffer, folder = "expense_tracker") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
};