import { FAILED_UPDATE_DATA } from '@/lib/constant';
import { TGroupMenu } from '@/schema/MaintenanceMenu/GroupMenu';
import { editGroupMenu, getListGroupMenu } from '@/service/maintenanceMenu/groupMenu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_QUERY = 'List_group_menu';
export const useGetListGroupMenu = () => {
  return useQuery({
    queryKey: [KEY_QUERY],
    initialData: [],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getListGroupMenu(),
  });
};

export const useEditGroupMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TGroupMenu }) => {
      try {
        const response = await editGroupMenu({ payload });
        if (response.isSuccess) {
          return { payload, response };
        }
        toast.info(response.errorMessages?.join(', '));
        return { payload: null, response: null };
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
      if (!payload) {
        return;
      }
      const previousData = queryClient.getQueryData([KEY_QUERY]) as TGroupMenu[];

      const updatedData = previousData.map((prev) => {
        if (prev.id === payload?.id) {
          return { ...payload, isUpdate: true };
        }
        return prev;
      });

      queryClient.setQueryData([KEY_QUERY], updatedData);
      return updatedData;
    },
  });
};
