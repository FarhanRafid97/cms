import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const getListCategory = async () => {
  const { data: categories, error } = await supabase.from('categories').select('*');
  if (error) {
    toast.error(`Error fetching categories: ${error.message}`);
    return [];
  }
  return categories;
};
