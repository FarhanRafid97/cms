import { getListUser } from '@/service/user/user';
import { useQuery } from '@tanstack/react-query';

const UNIQUE_KEY = 'user';

export const useGetListUser = () => {
  return useQuery({
    queryKey: [UNIQUE_KEY],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes.
    retry: false,
    queryFn: async () => getListUser(),
  });
};
