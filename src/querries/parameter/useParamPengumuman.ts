import { getParamPengumuman, updateParameterPengumuman } from '@/service/parameter/pengumuman';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const KEY_QUERY = 'param_pengumuman';
export const useGetParamPengumuman = () => {
  return useQuery({
    queryKey: [KEY_QUERY],
    initialData: '',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getParamPengumuman(),
  });
};

export const useUpdateParamPengumuman = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: { text: string } }) => {
      try {
        await updateParameterPengumuman({ payload });
        return { payload };
      } catch (error) {
        toast.error(`${error}`);
        throw error;
      }
    },

    onSuccess: ({ payload }: { payload: { text: string } }) => {
      queryClient.setQueryData([KEY_QUERY], payload.text);

      return payload;
    },
  });
};
