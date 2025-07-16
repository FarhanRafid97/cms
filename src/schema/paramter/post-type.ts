import { MESSAGE_FIELD_REQUIRED } from '@/lib/constant';
import { AdditionalData } from '@/types/globals';
import { Database } from 'database.types';
import { z } from 'zod';

export type PostType = Database['public']['Tables']['post_type']['Row'] & AdditionalData;

export const PostTypeSchema = z.object({
  name: z.string().min(1, { message: MESSAGE_FIELD_REQUIRED }).max(100),
});

export const UpdatePostTypeSchema = z.object({
  id: z.number().min(1, { message: MESSAGE_FIELD_REQUIRED }),
  name: z.string().min(1, { message: MESSAGE_FIELD_REQUIRED }).max(100),
});

export type CreatePostType = z.infer<typeof PostTypeSchema>;

export type UpdatePostType = z.infer<typeof UpdatePostTypeSchema>;
