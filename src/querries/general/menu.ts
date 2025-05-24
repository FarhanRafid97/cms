import { useQuery } from '@tanstack/react-query';

export const useGetListMenu = () => {
  return useQuery({
    queryKey: ['List_menu'],
    initialData: [],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      return [];
    },
  });
};
