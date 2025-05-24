import { Database } from 'database.types';
import { z } from 'zod';

// ===============================
// TYPESCRIPT INTERFACES
// ===============================

export type Author = Database['public']['Tables']['authors']['Row'];

export type Category = Database['public']['Tables']['categories']['Row'];

export type Tag = Database['public']['Tables']['tags']['Row'];

export type Post = Database['public']['Tables']['posts']['Row'];

export type PostDetail = Database['public']['Tables']['post_details']['Row'];

export type PostTag = Database['public']['Tables']['post_tags']['Row'];
export type Comment = Database['public']['Tables']['comments']['Row'];

export type Media = Database['public']['Tables']['media']['Row'];

export type NewsletterSubscriber = Database['public']['Tables']['newsletter_subscribers']['Row'];

export type SiteSetting = Database['public']['Tables']['site_settings']['Row'];

// Extended interfaces for joined data
export interface PostWithAuthor extends Post {
  username: string;
  first_name: string;
  last_name: string;
  avatar_url?: string;
  category_name?: string;
  category_slug?: string;
  category_color?: string;
}

export interface CompletePost extends PostWithAuthor {
  content: string;
  raw_content?: string;
  content_type: 'html' | 'markdown' | 'text';
  word_count?: number;
}

export interface PostWithStats extends Post {
  comment_count: number;
  tag_count: number;
  tags?: Tag[];
}

// ===============================
// ZOD VALIDATION SCHEMAS
// ===============================

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

export const UpdateAuthorSchema = CreateAuthorSchema.partial();

// Category schemas
export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().max(500).optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  description: z.string().max(500).optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

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
  name: z.string().min(1).max(50),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(/^[a-z0-9-]+$/),
});

// Post schemas
export const PostSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(500).optional(),
  featured_image_url: z.string().url().optional(),
  meta_title: z.string().max(255).optional(),
  meta_description: z.string().max(160).optional(),
  author_id: z.string().uuid(),
  category_id: z.string().uuid().optional(),
  status: z.enum(['draft', 'published', 'archived']),
  is_featured: z.boolean(),
  view_count: z.number().int().min(0),
  reading_time: z.number().int().min(1).optional(),
  published_at: z.string().datetime().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const CreatePostSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(500).optional(),
  featured_image_url: z.string().url().optional(),
  meta_title: z.string().max(255).optional(),
  meta_description: z.string().max(160).optional(),
  author_id: z.string().uuid(),
  category_id: z.string().uuid().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  is_featured: z.boolean().default(false),
  reading_time: z.number().int().min(1).optional(),
  published_at: z.string().datetime().optional(),
});

export const UpdatePostSchema = CreatePostSchema.partial();

// Post Detail schemas
export const PostDetailSchema = z.object({
  id: z.string().uuid(),
  post_id: z.string().uuid(),
  content: z.string().min(1),
  raw_content: z.string().optional(),
  content_type: z.enum(['html', 'markdown', 'text']),
  word_count: z.number().int().min(0).optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const CreatePostDetailSchema = z.object({
  post_id: z.string().uuid(),
  content: z.string().min(1),
  raw_content: z.string().optional(),
  content_type: z.enum(['html', 'markdown', 'text']).default('html'),
  word_count: z.number().int().min(0).optional(),
});

export const UpdatePostDetailSchema = z.object({
  content: z.string().min(1).optional(),
  raw_content: z.string().optional(),
  content_type: z.enum(['html', 'markdown', 'text']).optional(),
  word_count: z.number().int().min(0).optional(),
});

// Comment schemas
export const CommentSchema = z.object({
  id: z.string().uuid(),
  post_id: z.string().uuid(),
  author_name: z.string().min(1).max(100),
  author_email: z.string().email(),
  content: z.string().min(1).max(2000),
  parent_id: z.string().uuid().optional(),
  is_approved: z.boolean(),
  created_at: z.string().datetime(),
});

export const CreateCommentSchema = z.object({
  post_id: z.string().uuid(),
  author_name: z.string().min(1).max(100),
  author_email: z.string().email(),
  content: z.string().min(1).max(2000),
  parent_id: z.string().uuid().optional(),
});

// Media schemas
export const MediaSchema = z.object({
  id: z.string().uuid(),
  filename: z.string().min(1).max(255),
  original_name: z.string().min(1).max(255),
  file_path: z.string().min(1),
  file_size: z.number().int().min(0).optional(),
  mime_type: z.string().max(100).optional(),
  alt_text: z.string().max(255).optional(),
  uploaded_by: z.string().uuid().optional(),
  created_at: z.string().datetime(),
});

export const CreateMediaSchema = z.object({
  filename: z.string().min(1).max(255),
  original_name: z.string().min(1).max(255),
  file_path: z.string().min(1),
  file_size: z.number().int().min(0).optional(),
  mime_type: z.string().max(100).optional(),
  alt_text: z.string().max(255).optional(),
  uploaded_by: z.string().uuid().optional(),
});

// Newsletter schemas
export const NewsletterSubscriberSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  is_active: z.boolean(),
  subscribed_at: z.string().datetime(),
  unsubscribed_at: z.string().datetime().optional(),
});

export const CreateNewsletterSubscriberSchema = z.object({
  email: z.string().email(),
});

// Site Settings schemas
export const SiteSettingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string().optional(),
  type: z.enum(['string', 'number', 'boolean', 'json']),
  updated_at: z.string().datetime(),
});

export const CreateSiteSettingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.string().optional(),
  type: z.enum(['string', 'number', 'boolean', 'json']).default('string'),
});

// Combined schemas for creating posts with details
export const CreateCompletePostSchema = z.object({
  // Post data
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(500).optional(),
  featured_image_url: z.string().url().optional(),
  meta_title: z.string().max(255).optional(),
  meta_description: z.string().max(160).optional(),
  author_id: z.string().uuid(),
  category_id: z.string().uuid().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  is_featured: z.boolean().default(false),
  reading_time: z.number().int().min(1).optional(),
  published_at: z.string().datetime().optional(),

  // Post detail data
  content: z.string().min(1),
  raw_content: z.string().optional(),
  content_type: z.enum(['html', 'markdown', 'text']).default('html'),

  // Tags
  tag_ids: z.array(z.string().uuid()).optional(),
});

// Query parameter schemas
export const PostQuerySchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  category_id: z.string().uuid().optional(),
  author_id: z.string().uuid().optional(),
  featured: z.boolean().optional(),
  search: z.string().max(255).optional(),
  sort: z
    .enum(['created_at', 'updated_at', 'published_at', 'title', 'view_count'])
    .default('created_at'),
  order: z.enum(['asc', 'desc']).default('desc'),
});

// ===============================
// TYPE INFERENCE HELPERS
// ===============================

export type CreateAuthor = z.infer<typeof CreateAuthorSchema>;
export type UpdateAuthor = z.infer<typeof UpdateAuthorSchema>;

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;

export type CreateTag = z.infer<typeof CreateTagSchema>;

export type CreatePost = z.infer<typeof CreatePostSchema>;
export type UpdatePost = z.infer<typeof UpdatePostSchema>;

export type CreatePostDetail = z.infer<typeof CreatePostDetailSchema>;
export type UpdatePostDetail = z.infer<typeof UpdatePostDetailSchema>;

export type CreateComment = z.infer<typeof CreateCommentSchema>;

export type CreateMedia = z.infer<typeof CreateMediaSchema>;

export type CreateNewsletterSubscriber = z.infer<typeof CreateNewsletterSubscriberSchema>;

export type CreateSiteSetting = z.infer<typeof CreateSiteSettingSchema>;

export type CreateCompletePost = z.infer<typeof CreateCompletePostSchema>;

export type PostQuery = z.infer<typeof PostQuerySchema>;

// ===============================
// UTILITY FUNCTIONS
// ===============================

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
