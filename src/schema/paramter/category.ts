import { MESSAGE_FIELD_REQUIRED, MESSAGE_MAXIMUM_CHARACTER } from '@/lib/constant';
import { Database } from 'database.types';
import { z } from 'zod';

export type Category = Database['public']['Tables']['categories']['Row'];

export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: MESSAGE_FIELD_REQUIRED })
    .max(100, {
      message: `${MESSAGE_MAXIMUM_CHARACTER} 100`,
    }),
  slug: z.string().default(''),
  description: z.string().max(500).optional(),
  color: z
    .string()
    .min(1, { message: MESSAGE_FIELD_REQUIRED })
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
});
export const UpdateCategorySchema = CreateCategorySchema.partial();

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
