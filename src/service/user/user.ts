import { supabase } from '@/lib/supabase';

export const getListUser = async () => {
  const { data, error } = await supabase.from('authors').select('*');
  if (error) {
    throw error;
  }
  return data;
};

export const inviteUser = async (email: string) => {
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'signup',
    email: email,
    password: 'secret',
  });
  if (error) {
    throw error;
  }
  return data;
};
