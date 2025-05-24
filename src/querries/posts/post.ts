import { LIMIT_GET_POSTS } from '@/lib/constant';
import { getListCompletePosts } from '@/service/posts/posts';
import { useQuery } from '@tanstack/react-query';

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
