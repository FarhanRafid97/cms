import { supabase } from '@/lib/supabase';
import { CreateTag, UpdateTag } from '@/schema/paramter/tag';
import { toast } from 'sonner';

export const getListTags = async () => {
  const { data, error } = await supabase
    .from('tags')
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

export const createNewTag = async (payload: CreateTag) => {
  const { data, error } = await supabase.from('tags').insert(payload).select().single();
  if (error) {
    toast.error(`Error creating tag: ${error.message}`);
    return false;
  }
  return data;
};

export const updateTag = async (payload: UpdateTag) => {
  const { error } = await supabase.from('tags').update(payload).eq('id', payload.id);
  if (error) {
    toast.error(`Error updating tag: ${error.message}`);
    return false;
  }
  return true;
};

export const deleteTag = async (id: string) => {
  const { error } = await supabase.from('tags').delete().eq('id', id);
  if (error) {
    toast.error(`Error deleting tag: ${error.message}`);
    return false;
  }
  return true;
};
