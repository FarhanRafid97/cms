import { supabase } from '@/lib/supabase';

export const getMyself = async ({ user_id }: { user_id: string }) => {
  if (!user_id) {
    return null;
  }
  const { data: authors, error } = await supabase
    .from('authors')
    .select('*')
    .eq('user_id', user_id)
    .limit(1);

  if (error) {
    return null;
  }

  return authors[0];
};
