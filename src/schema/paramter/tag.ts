import { MESSAGE_FIELD_REQUIRED, MESSAGE_MAXIMUM_CHARACTER } from '@/lib/constant';
import { Database } from 'database.types';
import { z } from 'zod';
export type Tag = Database['public']['Tables']['tags']['Row'];

// Tag schemas
export const TagSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/),
  created_at: z.string().datetime(),
});

export const CreateTagSchema = z.object({
  name: z
    .string()
    .min(1, { message: MESSAGE_FIELD_REQUIRED })
    .max(50, { message: `${MESSAGE_MAXIMUM_CHARACTER} 50` }),
  slug: z.string().default(''),
});
export const UpdateTagSchema = CreateTagSchema.partial().extend({
  id: z.string().min(1, { message: MESSAGE_FIELD_REQUIRED }),
});

export type CreateTag = z.infer<typeof CreateTagSchema>;
export type UpdateTag = z.infer<typeof UpdateTagSchema>;
