import { supabase } from '@/lib/supabase';
import { CreateTag } from '@/schema/paramter/tag';
import { toast } from 'sonner';

export const getListTags = async () => {
  const { data, error } = await supabase.from('tags').select('*');
  if (error) {
    toast.error(`Error fetching categories: ${error.message}`);
    return [];
  }
  if (!data) {
    return [];
  }

  return data;
};

export const createNewTag = async (payload: CreateTag) => {
  const { data, error } = await supabase.from('tags').insert(payload).select().single();
  if (error) {
    toast.error(`Error creating tag: ${error.message}`);
    return false;
  }
  return data;
};
