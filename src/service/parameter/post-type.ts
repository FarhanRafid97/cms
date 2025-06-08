import { supabase } from '@/lib/supabase';
import { CreatePostType, UpdatePostType } from '@/schema/paramter/post-type';
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

export const updatePostType = async (payload: UpdatePostType) => {
  const { error } = await supabase
    .from('post_type')
    .update({ description: payload.description, name: payload.name })
    .eq('id', payload.id);

  if (error) {
    toast.error(`Error updating post type: ${error.message}`);
    return false;
  }
  return true;
};

export const deletePostType = async (id: number) => {
  const { error } = await supabase.from('post_type').delete().eq('id', id);
  if (error) {
    toast.error(`Error deleting post type: ${error.message}`);
    return false;
  }
  return true;
};
