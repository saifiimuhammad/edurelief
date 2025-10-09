import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// Upload helper
const uploadToCloudinary = async (file: File | null) => {
  if (!file) return null;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const upload = await cloudinary.uploader.upload_stream({
    folder: "edurelief_users",
    resource_type: "auto",
  });

  // Convert to stream
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "edurelief_users" },
      (err, result) => {
        if (err) reject(err);
        else resolve(result!.secure_url);
      }
    );
    stream.end(buffer);
  });
};

export { uploadToCloudinary };
