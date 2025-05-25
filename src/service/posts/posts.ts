import { LIMIT_GET_POSTS } from '@/lib/constant';
import { supabase } from '@/lib/supabase';
import { CreatePost, Post } from '@/schema/posts/post';
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

export const createNewPost = async ({ dataPost }: { dataPost: CreatePost }) => {
  const { data, error } = await supabase.from('posts').insert(dataPost);
  if (error) {
    toast.error(error.message);
    return null;
  }
  console.log(data);
  return data;
};
