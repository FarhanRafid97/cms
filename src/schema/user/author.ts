import { Session } from '@supabase/supabase-js';
import { Database } from 'database.types';
import { z } from 'zod';

export type Author = Database['public']['Tables']['authors']['Row'];

export type UserSession = {
  detail_user: Author | undefined;
  session: Session;
};
export type NoUser = {
  detail_user: null | undefined;
  session: null | undefined;
};
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
  email: z.string().email({ message: 'Email harus menggunakan format yang valid' }),
  username: z
    .string()
    .min(3, { message: 'Username harus minimal 3 karakter' })
    .max(50, { message: 'Username maksimal 50 karakter' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: 'Username hanya boleh mengandung huruf, angka, dan tanda hubung',
    }),
  first_name: z
    .string()
    .min(1, { message: 'Nama depan harus diisi' })
    .max(100, { message: 'Nama depan maksimal 100 karakter' }),
  last_name: z
    .string()
    .min(1, { message: 'Nama belakang harus diisi' })
    .max(100, { message: 'Nama belakang maksimal 100 karakter' }),
  bio: z.string().max(1000).optional(),
  avatar_url: z.string().min(1, { message: 'Avatar harus diisi' }),
  social_links: z
    .record(
      z.string().refine(
        (url) => {
          if (url.length > 0) {
            return url.startsWith('https://') || url.startsWith('http://');
          }
          return true;
        },
        {
          message: 'URL harus diawali dengan https://',
        },
      ),
    )
    .optional()
    .default({ twitter: '', instagram: '', linkedin: '', facebook: '' }),
  user_id: z.string().uuid(),
  role_id: z.number().min(1).max(3),
});

export const InviteAuthorSchema = z.object({
  email: z.string().email({ message: 'Email harus menggunakan format yang valid' }),
});

export const UpdateAuthorSchema = CreateAuthorSchema.partial();

export type CreateAuthor = z.infer<typeof CreateAuthorSchema>;
export type UpdateAuthor = z.infer<typeof UpdateAuthorSchema>;
export type InviteAuthor = z.infer<typeof InviteAuthorSchema>;
