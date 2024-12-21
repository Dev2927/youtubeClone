import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const responce = await cloudinary.uploader.upload(localFilePath, {
      folder: "youtubeClone",
      resource_type: "auto",
    });
    fs.unlink("public" + localFilePath, function (err) {
      if (err) {
        console.log("Error in cloudinary code: ", err.message);  
      }
    });
    return responce;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteOnCloudinary = async (public_id, resource_type) => {
  if (!public_id) return null;
  try {
    return await cloudinary.uploader.destroy(public_id, {
      resource_type,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
