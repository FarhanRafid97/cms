import { TInsertKantorPusat, TKantorPusat } from '@/schema/parameter/kantorPusat';
import {
  createKantorPusat,
  deleteKantorPusat,
  getListKantorPusat,
  updateKantorPusat,
} from '@/service/parameter/kantorPusat';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const KEY_QUERY = 'List_kantor_pusat';
export const useGetListKantorPusat = () => {
  return useQuery({
    queryKey: [KEY_QUERY],
    initialData: [],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getListKantorPusat(),
  });
};

export const useCreateKantorPusat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TInsertKantorPusat }) => {
      try {
        await createKantorPusat({
          payload: payload,
        });
        return { payload };
      } catch (error) {
        toast.error(`${error}`);
        throw error;
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY_QUERY] });
    },
  });
};

export const useUpdateKantorPusat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TKantorPusat }) => {
      try {
        await updateKantorPusat({ payload });
        return { payload };
      } catch (error) {
        toast.error(`${error}`);
        throw error;
      }
    },

    onSuccess: ({ payload }: { payload: TKantorPusat }) => {
      const previousData = queryClient.getQueryData([KEY_QUERY]) as TKantorPusat[];

      const newData = previousData.map((prevData) =>
        prevData.ID === payload.ID ? payload : prevData,
      );

      queryClient.setQueryData([KEY_QUERY], newData);
      return newData;
    },
  });
};

export const useDeleteKantorPusat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TKantorPusat }) => {
      try {
        await deleteKantorPusat({ payload });

        return { payload };
      } catch (error) {
        toast.error(`${error}`);
        throw error;
      }
    },

    onSuccess: ({ payload }: { payload: TKantorPusat | null }) => {
      if (payload === null) {
        return;
      }
      const previousData = queryClient.getQueryData([KEY_QUERY]) as TKantorPusat[];

      const newData = previousData.filter((prevData) => prevData.ID !== payload.ID);

      queryClient.setQueryData([KEY_QUERY], newData);
      return newData;
    },
  });
};
