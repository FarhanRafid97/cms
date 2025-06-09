import { supabase } from '@/lib/supabase';

export const getListRole = async () => {
  const { data, error } = await supabase.from('role').select('*');
  if (error) {
    throw error;
  }
  return data;
};
