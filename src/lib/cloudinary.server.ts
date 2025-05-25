import { v2 as cloudinary } from 'cloudinary';

export function signUpload() {
  try {
    const config = cloudinary.config();

    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: 'my-first-folder',
      },
      config.api_secret || '',
    );

    return {
      timestamp,
      signature,
      cloudName: config.cloud_name,
      apiKey: config.api_key,
    };
  } catch (error) {
    return null;
  }
}
