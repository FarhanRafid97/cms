import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const getListTags = async () => {
  const { data, error } = await supabase.from('tags').select('*');
  if (error) {
    toast.error(`Error fetching categories: ${error.message}`);
    return [];
  }
  return data;
};
