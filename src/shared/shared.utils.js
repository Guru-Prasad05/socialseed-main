const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

 const uploadPhoto = async (file, userId,folderName) => {
  try {
    const { filename, createReadStream } = await file;
    const newFilenm = filename.replace(/\.[^/.]+$/, "");
    const stream = createReadStream();
    const objectName = `${userId}-${Date.now()}-${newFilenm}`;
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(
      stream.path,
      {
        folder: `SocialSeed/${folderName}`,
        public_id: objectName,
        
      }
    );
    return cloudinaryResponse.secure_url;
  } catch (error) {
    throw new Error(
      error.message
    );
  }
};

module.exports=uploadPhoto