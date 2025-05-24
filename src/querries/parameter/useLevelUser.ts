import { getLevelUserDropdown, getListLevelUser } from '@/service/parameter/levelUser';
import { useQuery } from '@tanstack/react-query';

export const useGetListLevelUser = ({ isEnabled = true }: { isEnabled?: boolean }) => {
  return useQuery({
    queryKey: ['List_level_user'],
    enabled: isEnabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getListLevelUser(),
  });
};

export const useGetListLevelUserDropdown = ({ isEnabled = true }: { isEnabled?: boolean }) => {
  return useQuery({
    queryKey: ['List_level_user_dropdown'],
    enabled: isEnabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getLevelUserDropdown(),
  });
};
