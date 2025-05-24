import { FAILED_UPDATE_DATA } from '@/lib/constant';
import { TProductOwner } from '@/schema/parameter/productOwner';
import { editProductOwner, getListProductOwner } from '@/service/parameter/productOwner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_QUERY = 'List_product_owner';
export const useGetListProductOwner = () => {
  return useQuery({
    queryKey: [KEY_QUERY],
    refetchOnWindowFocus: false,
    staleTime: 5000,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getListProductOwner(),
  });
};

export const useEditProductOwnerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TProductOwner }) => {
      try {
        const response = await editProductOwner({ payload });
        return { response, payload };
      } catch (error) {
        let message = FAILED_UPDATE_DATA;
        if (error instanceof AxiosError && error.response?.data?.errorMessages) {
          message = `${error.response?.data?.errorMessages?.join(', ')}`;
        }
        toast.error(message);
        return { response: null, payload: null };
      }
    },
    onSuccess: ({ payload }) => {
      if (payload === null) {
        return;
      }
      const previousComments = queryClient.getQueryData([KEY_QUERY]) as TProductOwner[];

      const updatedData = previousComments.map((prev) => {
        if (prev.id === payload.id) {
          return { isUpdate: true, ...payload };
        }
        return prev;
      });

      queryClient.setQueryData([KEY_QUERY], updatedData);
      return updatedData;
    },
  });
};
