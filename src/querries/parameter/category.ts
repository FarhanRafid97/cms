import { getListCategory } from '@/service/parameter/category';
import { useQuery } from '@tanstack/react-query';

const KEY_CATEGOIRY = 'category';

export const useGetListCategory = () => {
  return useQuery({
    queryKey: [KEY_CATEGOIRY],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes.
    retry: false,
    queryFn: async () => getListCategory(),
  });
};
