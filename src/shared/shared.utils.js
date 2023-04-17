const cloudinary = require("cloudinary").v2;
const fs=require("fs")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadPhoto = async (createReadStream, userId, folderName, filename) => {
  const objectName = `${userId}-${Date.now()}-${filename}`;
  try {
    const uploadResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `SocialSeed/${folderName}`,
          public_id: objectName,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      createReadStream().pipe(stream);
    });
    return uploadResponse.secure_url ;
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

module.exports = uploadPhoto;
