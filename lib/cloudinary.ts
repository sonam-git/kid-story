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

/**
 * Extract public_id from Cloudinary URL
 * @param cloudinaryUrl - The full Cloudinary URL
 * @returns The public_id or null if not a valid Cloudinary URL
 */
export function extractPublicId(cloudinaryUrl: string): string | null {
  try {
    // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{format}
    // Or: https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.{format}
    
    if (!cloudinaryUrl.includes('res.cloudinary.com')) {
      return null;
    }

    const parts = cloudinaryUrl.split('/upload/');
    if (parts.length < 2) {
      return null;
    }

    // Get the part after /upload/
    let pathAfterUpload = parts[1];
    
    // Remove version if present (v123456789/)
    pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, '');
    
    // Remove file extension
    const publicId = pathAfterUpload.replace(/\.[^.]+$/, '');
    
    return publicId;
  } catch (error) {
    console.error('Error extracting public_id:', error);
    return null;
  }
}

/**
 * Delete an image from Cloudinary
 * @param cloudinaryUrl - The Cloudinary URL or public_id
 * @returns True if deleted successfully, false otherwise
 */
export async function deleteFromCloudinary(cloudinaryUrl: string): Promise<boolean> {
  try {
    // Extract public_id from URL
    const publicId = extractPublicId(cloudinaryUrl);
    
    if (!publicId) {
      console.warn('⚠️ Could not extract public_id from URL:', cloudinaryUrl);
      return false;
    }

    console.log(`🗑️ Deleting from Cloudinary: ${publicId}`);

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });

    if (result.result === 'ok') {
      console.log(`✅ Deleted from Cloudinary: ${publicId}`);
      return true;
    } else {
      console.warn(`⚠️ Cloudinary delete result: ${result.result} for ${publicId}`);
      return false;
    }
  } catch (error: any) {
    console.error('❌ Cloudinary delete error:', error.message);
    return false;
  }
}

/**
 * Delete multiple images from Cloudinary
 * @param cloudinaryUrls - Array of Cloudinary URLs
 * @returns Array of boolean results
 */
export async function deleteMultipleFromCloudinary(
  cloudinaryUrls: string[]
): Promise<boolean[]> {
  const deletePromises = cloudinaryUrls.map(url => deleteFromCloudinary(url));
  return Promise.all(deletePromises);
}

export default cloudinary;
