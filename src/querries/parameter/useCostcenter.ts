import { FAILED_INSERT_DATA } from '@/lib/constant';
import {
  CreateParamCostCenterRequestType,
  ResponseGetParamCostCenter,
  UpdateParamCostCenterRequestType,
} from '@/schema/parameter/costCenter';
import {
  createParamCostcenter,
  deleteParamCostcenter,
  getListParamCostCenter,
  updateParamCostcenter,
} from '@/service/parameter/costCenter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_QUERY = 'PARAM_COST_CENTER';

export const useGetCostCenter = () => {
  return useQuery({
    queryKey: [KEY_QUERY],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListParamCostCenter();

      return response;
    },
  });
};

export const useCreateCostCenter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: CreateParamCostCenterRequestType }) => {
      try {
        const response = await createParamCostcenter({
          payload,
        });

        if (response.status === '00') {
          return { response, payload };
        }
        toast.info(response.message);
        return { payload: null, response: null };
      } catch (error) {
        let errorMsg = FAILED_INSERT_DATA;

        if (error instanceof AxiosError) {
          errorMsg = error.response?.data?.errorMessages?.join(',');
        }
        toast.error(errorMsg);
        return { payload: null, response: null };
      }
    },
    onSuccess: ({ response }) => {
      if (!response) {
        return;
      }
      const previousData = queryClient.getQueryData([KEY_QUERY]) as ResponseGetParamCostCenter;

      const newData = [{ ...response.data, isNew: true }, ...previousData.data];

      queryClient.setQueryData([KEY_QUERY], { ...previousData, data: newData });
      return newData;
    },
  });
};
export const useUpdateCostCenter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: UpdateParamCostCenterRequestType }) => {
      try {
        const response = await updateParamCostcenter({
          payload,
        });

        if (response.status === '00') {
          return { response, payload };
        }
        toast.info(response.message);
        return { payload: null, response: null };
      } catch (error) {
        let errorMsg = FAILED_INSERT_DATA;

        if (error instanceof AxiosError) {
          errorMsg = error.response?.data?.errorMessages?.join(',');
        }
        toast.error(errorMsg);
        return { payload: null, response: null };
      }
    },
    onSuccess: ({ response }) => {
      if (!response) {
        return;
      }
      const previousData = queryClient.getQueryData([KEY_QUERY]) as ResponseGetParamCostCenter;

      const newData = previousData.data.map((costCenter) =>
        costCenter.ID === response.data.ID ? { ...response.data, isUpdate: true } : costCenter,
      );

      queryClient.setQueryData([KEY_QUERY], { ...previousData, data: newData });
      return newData;
    },
  });
};
export const useDeleteCostCenter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      try {
        const response = await deleteParamCostcenter({
          id,
        });

        if (response.status === '00') {
          return { response, payload: { id } };
        }
        toast.info(response.message);
        return { payload: null, response: null };
      } catch (error) {
        let errorMsg = FAILED_INSERT_DATA;

        if (error instanceof AxiosError) {
          errorMsg = error.response?.data?.errorMessages?.join(',');
        }
        toast.error(errorMsg);
        return { payload: null, response: null };
      }
    },
    onSuccess: ({ payload }) => {
      if (!payload) {
        return;
      }
      const previousData = queryClient.getQueryData([KEY_QUERY]) as ResponseGetParamCostCenter;

      const newData = previousData.data.filter((costCenter) => costCenter.ID !== payload.id);

      queryClient.setQueryData([KEY_QUERY], { ...previousData, data: newData });
      return newData;
    },
  });
};
