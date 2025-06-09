import { Database } from 'database.types';
import { z } from 'zod';

export type Author = Database['public']['Tables']['authors']['Row'];
// Author schemas
export const AuthorSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_-]+$/),
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  bio: z.string().max(1000).optional(),
  avatar_url: z.string().url().optional(),
  social_links: z.record(z.string().url()).optional(),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const CreateAuthorSchema = z.object({
  email: z.string().email(),
  username: z
    .string()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z0-9_-]+$/),
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  bio: z.string().max(1000).optional(),
  avatar_url: z.string().url().optional(),
  social_links: z.record(z.string().url()).optional(),
});

export const InviteAuthorSchema = z.object({
  email: z.string().email({ message: 'Email harus menggunakan format yang valid' }),
});

export const UpdateAuthorSchema = CreateAuthorSchema.partial();

export type CreateAuthor = z.infer<typeof CreateAuthorSchema>;
export type UpdateAuthor = z.infer<typeof UpdateAuthorSchema>;
export type InviteAuthor = z.infer<typeof InviteAuthorSchema>;
