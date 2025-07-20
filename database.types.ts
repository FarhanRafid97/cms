export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      authors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string
          first_name: string
          id: string
          is_active: boolean | null
          last_name: string
          role_id: number | null
          social_links: Json | null
          updated_at: string | null
          user_id: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          is_active?: boolean | null
          last_name: string
          role_id?: number | null
          social_links?: Json | null
          updated_at?: string | null
          user_id?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          is_active?: boolean | null
          last_name?: string
          role_id?: number | null
          social_links?: Json | null
          updated_at?: string | null
          user_id?: string
          username?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          author_email: string
          author_name: string
          content: string
          created_at: string | null
          id: string
          is_approved: boolean | null
          parent_id: string | null
          post_id: string
        }
        Insert: {
          author_email: string
          author_name: string
          content: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          parent_id?: string | null
          post_id: string
        }
        Update: {
          author_email?: string
          author_name?: string
          content?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          parent_id?: string | null
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "complete_detail_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "complete_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "published_posts_with_author"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          alt_text: string | null
          created_at: string | null
          file_path: string
          file_size: number | null
          filename: string
          id: string
          mime_type: string | null
          original_name: string
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string | null
          file_path: string
          file_size?: number | null
          filename: string
          id?: string
          mime_type?: string | null
          original_name: string
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string | null
          file_path?: string
          file_size?: number | null
          filename?: string
          id?: string
          mime_type?: string | null
          original_name?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "media_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          subscribed_at: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      post_details: {
        Row: {
          content: string
          content_type: string | null
          id: string
          post_id: string
          word_count: number | null
        }
        Insert: {
          content: string
          content_type?: string | null
          id?: string
          post_id: string
          word_count?: number | null
        }
        Update: {
          content?: string
          content_type?: string | null
          id?: string
          post_id?: string
          word_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "post_details_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "complete_detail_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_details_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "complete_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_details_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_details_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: true
            referencedRelation: "published_posts_with_author"
            referencedColumns: ["id"]
          },
        ]
      }
      post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "complete_detail_post"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "complete_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "published_posts_with_author"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      post_type: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          author_id: string
          category_id: string | null
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          id: string
          is_featured: boolean | null
          meta_description: string | null
          meta_title: string | null
          post_type_id: number | null
          published_at: string | null
          reading_time: number | null
          real_author_email: string | null
          real_author_name: string | null
          slug: string
          status: string | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id: string
          category_id?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          post_type_id?: number | null
          published_at?: string | null
          reading_time?: number | null
          real_author_email?: string | null
          real_author_name?: string | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string
          category_id?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          is_featured?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          post_type_id?: number | null
          published_at?: string | null
          reading_time?: number | null
          real_author_email?: string | null
          real_author_name?: string | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "complete_detail_post"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "posts_post_type_id_fkey"
            columns: ["post_type_id"]
            isOneToOne: false
            referencedRelation: "complete_posts"
            referencedColumns: ["post_type_id"]
          },
          {
            foreignKeyName: "posts_post_type_id_fkey"
            columns: ["post_type_id"]
            isOneToOne: false
            referencedRelation: "post_type"
            referencedColumns: ["id"]
          },
        ]
      }
      role: {
        Row: {
          id: number
          role: string | null
        }
        Insert: {
          id?: number
          role?: string | null
        }
        Update: {
          id?: number
          role?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          key: string
          type: string | null
          updated_at: string | null
          value: string | null
        }
        Insert: {
          key: string
          type?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          key?: string
          type?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      tags: {
        Row: {
          color: string | null
          created_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      complete_detail_post: {
        Row: {
          author_id: string | null
          avatar_url: string | null
          category_color: string | null
          category_id: string | null
          category_name: string | null
          category_slug: string | null
          content: string | null
          created_at: string | null
          featured_image_url: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          meta_description: string | null
          meta_title: string | null
          post_type: string | null
          post_type_id: number | null
          published_at: string | null
          reading_time: number | null
          real_author_email: string | null
          real_author_name: string | null
          slug: string | null
          status: string | null
          title: string | null
          updated_at: string | null
          username: string | null
          word_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_post_type_id_fkey"
            columns: ["post_type_id"]
            isOneToOne: false
            referencedRelation: "complete_posts"
            referencedColumns: ["post_type_id"]
          },
          {
            foreignKeyName: "posts_post_type_id_fkey"
            columns: ["post_type_id"]
            isOneToOne: false
            referencedRelation: "post_type"
            referencedColumns: ["id"]
          },
        ]
      }
      complete_posts: {
        Row: {
          author_id: string | null
          avatar_url: string | null
          category_color: string | null
          category_id: string | null
          category_name: string | null
          category_slug: string | null
          created_at: string | null
          excerpt: string | null
          featured_image_url: string | null
          first_name: string | null
          id: string | null
          is_featured: boolean | null
          last_name: string | null
          meta_description: string | null
          meta_title: string | null
          post_type: string | null
          post_type_id: number | null
          published_at: string | null
          reading_time: number | null
          slug: string | null
          status: string | null
          title: string | null
          updated_at: string | null
          username: string | null
          view_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "complete_detail_post"
            referencedColumns: ["category_id"]
          },
        ]
      }
      published_posts_with_author: {
        Row: {
          author_id: string | null
          avatar_url: string | null
          category_color: string | null
          category_id: string | null
          category_name: string | null
          category_slug: string | null
          created_at: string | null
          featured_image_url: string | null
          first_name: string | null
          id: string | null
          is_featured: boolean | null
          last_name: string | null
          meta_description: string | null
          meta_title: string | null
          post_type: string | null
          post_type_id: number | null
          published_at: string | null
          reading_time: number | null
          slug: string | null
          status: string | null
          title: string | null
          updated_at: string | null
          username: string | null
          view_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "complete_detail_post"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "posts_post_type_id_fkey"
            columns: ["post_type_id"]
            isOneToOne: false
            referencedRelation: "complete_posts"
            referencedColumns: ["post_type_id"]
          },
          {
            foreignKeyName: "posts_post_type_id_fkey"
            columns: ["post_type_id"]
            isOneToOne: false
            referencedRelation: "post_type"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
