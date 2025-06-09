import { supabase } from '@/lib/supabase';

export const getListUser = async () => {
  const { data, error } = await supabase.from('authors').select('*');
  if (error) {
    throw error;
  }
  return data;
};
