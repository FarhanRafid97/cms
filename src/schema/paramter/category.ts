import { MESSAGE_FIELD_REQUIRED, MESSAGE_MAXIMUM_CHARACTER } from '@/lib/constant';
import { AdditionalData } from '@/types/globals';
import { Database } from 'database.types';
import { z } from 'zod';

export type Category = Database['public']['Tables']['categories']['Row'] & AdditionalData;

export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: MESSAGE_FIELD_REQUIRED })
    .max(100, {
      message: `${MESSAGE_MAXIMUM_CHARACTER} 100`,
    }),
  slug: z.string().default(''),
  description: z.string().min(1, { message: MESSAGE_FIELD_REQUIRED }).max(500).optional(),
  color: z
    .string()
    .min(1, { message: MESSAGE_FIELD_REQUIRED })
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .default(''),
});
export const UpdateCategorySchema = CreateCategorySchema.partial().extend({
  id: z.string().min(1, { message: MESSAGE_FIELD_REQUIRED }),
});

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;
