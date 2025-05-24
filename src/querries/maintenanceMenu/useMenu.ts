import { FAILED_UPDATE_DATA, MESSAGE_SUCCESS_UPDATE_DATA } from '@/lib/constant';
import { TMaintenanceMenuMenu } from '@/schema/MaintenanceMenu/menu';
import { editMaintenanceMenu, getListMenu } from '@/service/maintenanceMenu/menu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_QUERY = 'list_menu';
export const useGetListMenu = () => {
  return useQuery({
    queryKey: [KEY_QUERY],
    initialData: [],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getListMenu(),
  });
};

export const useEditMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TMaintenanceMenuMenu }) => {
      try {
        const response = await editMaintenanceMenu({ payload });
        if (response.isSuccess) {
          toast.success(`${MESSAGE_SUCCESS_UPDATE_DATA} Menu`);
          return { response, payload };
        }
        toast.info(response?.errorMessages.join(', '));
        return { response, payload: null };
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
      const previousData = queryClient.getQueryData([KEY_QUERY]) as TMaintenanceMenuMenu[];

      const updatedData = previousData.map((prev) => {
        if (prev.id === payload?.id) {
          return { isUpdate: true, ...payload };
        }
        return prev;
      });

      queryClient.setQueryData([KEY_QUERY], updatedData);
      return updatedData;
    },
  });
};
