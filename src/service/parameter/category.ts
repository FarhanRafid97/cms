import { supabase } from '@/lib/supabase';
import { CreateCategory, UpdateCategory } from '@/schema/paramter/category';
import { toast } from 'sonner';

export const getListCategory = async () => {
  const { data: categories, error } = await supabase.from('categories').select('*');
  if (error) {
    toast.error(`Error fetching categories: ${error.message}`);
    return [];
  }
  return categories;
};

export const createNewCategory = async (payload: CreateCategory) => {
  const { data, error } = await supabase.from('categories').insert(payload).select().single();
  if (error) {
    toast.error(`Error creating category: ${error.message}`);
    return false;
  }
  return data;
};

export const updateCategory = async (payload: UpdateCategory) => {
  const { error } = await supabase.from('categories').update(payload).eq('id', payload.id);

  if (error) {
    toast.error(`Error updating category: ${error.message}`);
    return false;
  }
  return true;
};

export const deleteCategory = async (id: string) => {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) {
    toast.error(`Error deleting category: ${error.message}`);
    return false;
  }
  return true;
};
