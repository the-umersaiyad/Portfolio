import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Uploads a Next.js `File` object directly to Cloudinary using streams.
 * Returns the secure URL of the uploaded file.
 */
export async function uploadFileToCloudinary(file: File, folder: string = "portfolio"): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    // Extract extension (e.g., "pdf", "jpg") from file name
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    // Cloudinary treats PDFs as images by default for transformations. 
    // We must NOT use "raw" because Cloudinary blocks unauthenticated access to raw PDFs by default.
    // Instead, we use "auto" (which becomes "image") and ensure the public_id ends with .pdf
    const resourceType = 'auto';

    // Cloudinary upload_stream doesn't know the file name because it receives a raw buffer.
    // We provide a clean public_id without the extension. 
    // Cloudinary will automatically detect the format and append .pdf to the secure_url.
    const cleanFileName = file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const publicId = `${cleanFileName}_${randomSuffix}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: resourceType,
        public_id: publicId,
        format: undefined, // Don't use format parameter since it's already in public_id
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Unknown error during upload"));
        }
      }
    );

    uploadStream.end(buffer);
  });
}
