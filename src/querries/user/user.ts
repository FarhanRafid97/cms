import { CreateAuthor } from '@/schema/user/author';
import { getListUser, insertBiodataUser, inviteUser } from '@/service/user/user';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

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

export const useInviteUser = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      try {
        const response = await inviteUser(email);
        return response;
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Terjadi kesalahan');
      }
    },
  });
};

export const useInsertBiodataUser = () => {
  return useMutation({
    mutationFn: async (payload: CreateAuthor) => {
      const response = await insertBiodataUser({ payload });
      return response;
    },
  });
};
