import { MESSAGE_FIELD_REQUIRED, MESSAGE_MAXIMUM_CHARACTER } from '@/lib/constant';
import { Database } from 'database.types';
import { z } from 'zod';

export type PostType = Database['public']['Tables']['post_type']['Row'];

export const PostTypeSchema = z.object({
  name: z.string().min(1, { message: MESSAGE_FIELD_REQUIRED }).max(100),
  description: z
    .string()
    .min(1, { message: MESSAGE_FIELD_REQUIRED })
    .max(500, { message: MESSAGE_MAXIMUM_CHARACTER })
    .optional(),
});

export const UpdatePostTypeSchema = z.object({
  id: z.number().min(1, { message: MESSAGE_FIELD_REQUIRED }),
  created_at: z.string().min(1, { message: MESSAGE_FIELD_REQUIRED }),
  name: z.string().min(1, { message: MESSAGE_FIELD_REQUIRED }).max(100),
  description: z
    .string()
    .min(1, { message: MESSAGE_FIELD_REQUIRED })
    .max(500, { message: MESSAGE_MAXIMUM_CHARACTER })
    .optional(),
});

export type CreatePostType = z.infer<typeof PostTypeSchema>;

export type UpdatePostType = z.infer<typeof UpdatePostTypeSchema>;
