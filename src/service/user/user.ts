import { supabase } from '@/lib/supabase';

export const getListUser = async () => {
  const { data, error } = await supabase.from('authors').select('*');
  if (error) {
    throw error;
  }
  return data;
};

export const inviteUser = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    throw error;
  }
};
