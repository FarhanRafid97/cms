import { LIMIT_GET_POSTS } from '@/lib/constant';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const getListCompletePosts = async ({
  offsetFrom = 0,
  offsetTo = LIMIT_GET_POSTS,
}: {
  offsetFrom: number;
  offsetTo: number;
}) => {
  const { data, error } = await supabase
    .from('complete_posts')
    .select('*')
    .range(offsetFrom, offsetTo);

  if (error) {
    toast.error(`Error fetching categories: ${error.message}`);
    return [];
  }
  return data;
};
