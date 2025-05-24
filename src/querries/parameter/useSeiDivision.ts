import { FAILED_UPDATE_DATA } from '@/lib/constant';
import { SeiDivision } from '@/schema/parameter/seiDivision';
import { editSeiDivision, getListSeiDivision } from '@/service/parameter/seiDivision';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_QUERY = 'list_sei_division';
export const useGetListSeiDivision = () => {
  return useQuery({
    queryKey: [KEY_QUERY],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getListSeiDivision(),
  });
};

export const useEditSeiDivision = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: SeiDivision }) => {
      try {
        const response = await editSeiDivision({ payload });
        if (response.isSuccess) {
          return { payload, response };
        }
        toast.info(response?.errorMessages.join(', '));
        return { payload: null, response: null };
      } catch (error) {
        let message = FAILED_UPDATE_DATA;
        if (error instanceof AxiosError && error.response?.data?.errorMessages) {
          message = `${error.response?.data?.errorMessages?.join(', ')}`;
        }
        toast.error(message);
        return { payload: null, response: null };
      }
    },

    onSuccess: ({ payload }) => {
      if (!payload) {
        return;
      }
      const previousComments = queryClient.getQueryData([KEY_QUERY]) as SeiDivision[];

      const updatedUser = previousComments.map((application) => {
        if (application.id === payload.id) {
          return { isUpdate: true, ...payload };
        }
        return application;
      });

      queryClient.setQueryData([KEY_QUERY], updatedUser);
      return updatedUser;
    },
  });
};
