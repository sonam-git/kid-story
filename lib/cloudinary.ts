/**
 * Cloudinary Upload Utility
 * Uploads images to Cloudinary with organized folder structure
 */

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadOptions {
  folder?: string;
  public_id?: string;
  tags?: string[];
}

/**
 * Upload an image URL to Cloudinary
 * @param imageUrl - The URL of the image to upload
 * @param options - Upload options (folder, public_id, tags)
 * @returns The secure URL of the uploaded image
 */
export async function uploadToCloudinary(
  imageUrl: string,
  options: UploadOptions = {}
): Promise<string> {
  try {
    const {
      folder = 'story-magic', // Default folder for this app
      public_id,
      tags = ['ai-generated', 'story']
    } = options;

    console.log(`📤 Uploading to Cloudinary folder: ${folder}`);

    const result = await cloudinary.uploader.upload(imageUrl, {
      folder,
      public_id,
      tags,
      resource_type: 'image',
      overwrite: false, // Don't overwrite existing images
    });

    console.log(`✅ Uploaded to Cloudinary: ${result.secure_url}`);
    return result.secure_url;
  } catch (error: any) {
    console.error('❌ Cloudinary upload error:', error.message);
    // Return original URL if upload fails
    return imageUrl;
  }
}

/**
 * Upload multiple images to Cloudinary
 * @param imageUrls - Array of image URLs to upload
 * @param options - Upload options
 * @returns Array of secure URLs
 */
export async function uploadMultipleToCloudinary(
  imageUrls: string[],
  options: UploadOptions = {}
): Promise<string[]> {
  const uploadPromises = imageUrls.map((url, index) => {
    const publicId = options.public_id ? `${options.public_id}_${index + 1}` : undefined;
    return uploadToCloudinary(url, { ...options, public_id: publicId });
  });

  return Promise.all(uploadPromises);
}

export default cloudinary;
