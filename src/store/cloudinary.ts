import { Cloudinary } from '@/types/globals';
import { create } from 'zustand';

interface CloudinaryStateProps {
  cloudinary: Cloudinary | null;
}

export const useGetCloudinary = create<CloudinaryStateProps>(() => ({
  cloudinary: null,
}));

export const setCloudinaryData = ({ cloudinary }: { cloudinary: Cloudinary }) => {
  return useGetCloudinary.setState({ cloudinary });
};
