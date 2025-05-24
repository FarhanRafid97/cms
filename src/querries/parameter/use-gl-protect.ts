import { FAILED_INSERT_DATA } from '@/lib/constant';
import {
  CreateGLProtectRequestType,
  ResponseGetGLProtect,
  UpdateGLProtectRequestType,
} from '@/schema/parameter/gl-protect-schema';
import {
  createParamGlProtect,
  deleteParamGLProtect,
  getListParamGLProtect,
  updateParamGLProtect,
} from '@/service/parameter/gl-protect';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_QUERY = 'PARAM_GL_PROTECT';

export const useGetGLProtect = () => {
  return useQuery({
    queryKey: [KEY_QUERY],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getListParamGLProtect(),
  });
};

export const useCreateParamGLProtect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: CreateGLProtectRequestType }) => {
      try {
        const response = await createParamGlProtect({
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
      const previousData = queryClient.getQueryData([KEY_QUERY]) as ResponseGetGLProtect;

      const newData = [{ ...response.data, isNew: true }, ...previousData.data];

      queryClient.setQueryData([KEY_QUERY], { ...previousData, data: newData });
      return newData;
    },
  });
};

export const useUpdateGLProtect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: UpdateGLProtectRequestType }) => {
      try {
        const response = await updateParamGLProtect({
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
      const previousData = queryClient.getQueryData([KEY_QUERY]) as ResponseGetGLProtect;

      const newData = previousData.data.map((glProtect) => {
        return glProtect.ID === response.data.ID ? { ...response.data, isUpdate: true } : glProtect;
      });

      queryClient.setQueryData([KEY_QUERY], { ...previousData, data: newData });
      return newData;
    },
  });
};

export const useDeleteGLProtect = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      try {
        const response = await deleteParamGLProtect({
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
      const previousData = queryClient.getQueryData([KEY_QUERY]) as ResponseGetGLProtect;

      const newData = previousData.data.filter((glProtect) => glProtect.ID !== payload.id);

      queryClient.setQueryData([KEY_QUERY], { ...previousData, data: newData });
      return newData;
    },
  });
};
