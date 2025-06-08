import { supabase } from '@/lib/supabase';
import { CreatePostType } from '@/schema/posts/post';
import { toast } from 'sonner';

export const getListPostType = async () => {
  const { data, error } = await supabase
    .from('post_type')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    toast.error(`Error fetching categories: ${error.message}`);
    return [];
  }
  if (!data) {
    return [];
  }

  return data;
};

export const createNewPostType = async (payload: CreatePostType) => {
  const { data, error } = await supabase
    .from('post_type')
    .insert({
      name: payload.name,
      description: payload.description,
    })
    .select('*')
    .single();
  if (error) {
    toast.error(`Error creating post type: ${error.message}`);
    return false;
  }
  return data;
};
