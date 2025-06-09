import { getListUser, inviteUser } from '@/service/user/user';
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
    mutationFn: async (email: string) => inviteUser(email),
    onSuccess: () => {
      toast.success('User berhasil diundang, silahkan cek email untuk melanjutkan');
    },
    onError: () => {
      toast.error('User gagal diundang');
    },
  });
};
