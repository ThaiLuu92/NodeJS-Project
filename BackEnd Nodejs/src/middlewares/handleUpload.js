import {
  uploadToCloudinary,
  deleteCloudinary,
} from "../configs/cloudinary.config.js";
import upload from "../configs/multer.config.js";
import multer from "multer";
const createUploadHandler = (fieldName) => {
  const handleUpload = upload.single(fieldName);
  return (req, res, next) => {
    
    handleUpload(req, res, async (error) => {
      console.log(1111,req.files);
      if (error instanceof multer.MulterError) {
        return res.status(400).json({ error: "Multer error" });
      } else if (error) {
        return res.status(500).json({ error: "Unknown error" });
      }
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }
      try {
        const result = await uploadToCloudinary(req.file);
        req.urlUpload = result.url;
        req.body[fieldName] = result.url;
        next();
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    });
  };
};

export const handleAvatarUpload = createUploadHandler("avatar");
export const handleCourseImgUpload = createUploadHandler("course_img");

export const createUploadHandlerAny = (req, res, next) => {

  upload.any()(req, res, async (error) => {
      if (error instanceof multer.MulterError) {
        return res.status(400).json({ error: "Multer error" });
      } else if (error) {
        return res.status(500).json({ error: "Unknown error" });
      }
      try {
        const files = req.files;
        const imageUrls = await Promise.all(files.map((file) => uploadToCloudinary(file)));
        imageUrls.forEach((item, index) => {
          req.body[files[index].fieldname] = item.url;
        });

        

        next();
      } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return res.status(500).json({ error: "Error uploading to Cloudinary" });
      }
    })
  };




