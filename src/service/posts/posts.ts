import { DETAULT_DETAIL_POST, LIMIT_GET_POSTS } from '@/lib/constant';
import { supabase } from '@/lib/supabase';
import { CreatePost } from '@/schema/posts/post';
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
  const { data, error } = await supabase
    .from('posts')
    .insert(dataPost)
    .select('*,authors(*),categories(*),post_type(*)');
  if (error) {
    toast.error(error.message);
    return null;
  }
  const responseCreatePost = data[0];
  const { error: errorPostDetail } = await supabase
    .from('post_details')
    .insert({ content: DETAULT_DETAIL_POST, post_id: responseCreatePost.id });

  if (errorPostDetail) {
    toast.error(errorPostDetail.message);
    return responseCreatePost;
  }

  return responseCreatePost;
};

export const getPostDetail = async ({ postId }: { postId: string }) => {
  const { data, error } = await supabase.from('post_details').select('*').eq('post_id', postId);
  if (error) {
    toast.error(error.message);
    return null;
  }
  return data[0];
};

export const updatePostDetail = async ({
  payload,
}: {
  payload: { postId: string; content: string; detail_post_id: string };
}) => {
  const { error } = await supabase
    .from('post_details')
    .update({ content: payload.content })
    .eq('id', payload.detail_post_id);
  if (error) {
    toast.error(error.message);
    return false;
  }
  return true;
};
