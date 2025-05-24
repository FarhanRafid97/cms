import { getListTags } from '@/service/parameter/tag';
import { useQuery } from '@tanstack/react-query';

const UNIQUE_KEY = 'tags';

export const useGetListTag = () => {
  return useQuery({
    queryKey: [UNIQUE_KEY],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes.
    retry: false,
    queryFn: async () => getListTags(),
  });
};
