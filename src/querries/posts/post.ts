import { LIMIT_GET_POSTS } from '@/lib/constant';
import { CreatePost, Post } from '@/schema/posts/post';
import { createNewPost, getListCompletePosts } from '@/service/posts/posts';
import { useMutation, useQuery } from '@tanstack/react-query';

const UNIQUE_KEY = 'post';

export const useGetCompletePosts = ({
  offsetFrom,
  offsetTo,
}: {
  offsetFrom: number;
  offsetTo: number;
}) => {
  return useQuery({
    queryKey: [UNIQUE_KEY, offsetFrom, offsetTo],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes.
    retry: false,
    queryFn: async () => {
      const result = await getListCompletePosts({ offsetFrom, offsetTo });
      return {
        data: result,
        totalData: result.length,
      };
    },
  });
};

export const useCreateNewPost = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: CreatePost }) => {
      try {
        const response = await createNewPost({ dataPost: payload });

        if (response) {
          return { payload, response };
        }
        return { payload: null, response: null };
      } catch (error) {
        return { payload: null, response: null };
      }
    },
  });
};
