import { getListRole } from '@/service/user/role';
import { useQuery } from '@tanstack/react-query';

const UNIQUE_KEY = 'role';

export const useGetListRole = () => {
  return useQuery({
    queryKey: [UNIQUE_KEY],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes.
    retry: false,
    queryFn: async () => getListRole(),
  });
};
