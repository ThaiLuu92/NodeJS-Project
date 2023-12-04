import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


export const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

export const deleteCloudinary = (id) => {
    return cloudinary.uploader.destroy(id);
  };




