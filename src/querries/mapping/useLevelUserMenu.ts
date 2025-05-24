import {
  FAILED_DELETE_DATA,
  FAILED_INSERT_DATA,
  FAILED_UPDATE_DATA,
  MESSAGE_SUCCESS_DELETE_DATA,
  MESSAGE_SUCCESS_INSERT_DATA,
  MESSAGE_SUCCESS_UPDATE_DATA,
} from '@/lib/constant';
import { TInsertLevelUserMenu, TLevelUserMenu } from '@/schema/Mapping/LevelUserMenu';
import {
  createLevelUserMenu,
  deleteLevelUserMenu,
  editLevelUserMenu,
  getListLevelUserMenu,
} from '@/service/mapping/levelUserMenu';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_QUERY = 'List_Level_Menu_User';
export const useGetLevelUserMenu = () => {
  return useQuery({
    queryKey: [KEY_QUERY],
    initialData: [],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getListLevelUserMenu(),
  });
};

export const useCreateLevelUserMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TInsertLevelUserMenu }) => {
      try {
        const response = await createLevelUserMenu({
          payload: payload,
        });
        if (response.isSuccess) {
          toast.success(MESSAGE_SUCCESS_INSERT_DATA);
          return { payload: { ...payload, id: response.result.id } };
        }
        toast.info(response?.errorMessages.join(','));
        return { payload: null };
      } catch (error) {
        let errorMsg = FAILED_INSERT_DATA;

        if (error instanceof AxiosError && error.response?.data?.errorMessages) {
          errorMsg = error.response?.data?.errorMessages?.join(',');
        }
        toast.error(errorMsg);
        return { payload: null };
      }
    },

    onSuccess: ({ payload }) => {
      if (!payload) {
        return;
      }
      const previousData = queryClient.getQueryData([KEY_QUERY]) as TInsertLevelUserMenu[];

      const newData = [{ isNew: true, ...payload }, ...previousData];

      queryClient.setQueryData([KEY_QUERY], newData);
      return newData;
    },
  });
};

export const useEditLevelUserMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TLevelUserMenu }) => {
      try {
        const response = await editLevelUserMenu({ payload });
        if (response.isSuccess) {
          toast.success(MESSAGE_SUCCESS_UPDATE_DATA);
          return { payload };
        }
        return { payload: null };
      } catch (error) {
        let errorMsg = FAILED_UPDATE_DATA;

        if (error instanceof AxiosError && error.response?.data?.errorMessages.length > 0) {
          errorMsg = error.response?.data?.errorMessages?.join(',');
        }
        toast.error(errorMsg);
        return { payload: null };
      }
    },

    onSuccess: ({ payload }: { payload: TLevelUserMenu | null }) => {
      if (!payload) {
        return;
      }

      const previousData = queryClient.getQueryData([KEY_QUERY]) as TLevelUserMenu[];

      const newData = previousData.map((prevData) =>
        prevData.id === payload.id ? { ...payload, isUpdate: true } : prevData,
      );

      queryClient.setQueryData([KEY_QUERY], newData);
      return newData;
    },
  });
};

export const useDeleteLevelUserMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TLevelUserMenu }) => {
      try {
        const response = await deleteLevelUserMenu({ payload });
        if (response.isSuccess) {
          toast.success(MESSAGE_SUCCESS_DELETE_DATA);
          return { payload };
        }
        toast.info(response?.errorMessages.join(', '));
        return { payload: null };
      } catch (error) {
        let errorMsg = FAILED_DELETE_DATA;
        if (error instanceof AxiosError && error.response?.data?.errorMessages.length) {
          errorMsg = error.response?.data?.errorMessages?.join(',');
        }
        toast.error(errorMsg);
        return { payload: null };
      }
    },

    onSuccess: ({ payload }) => {
      if (!payload) {
        return;
      }
      const previousData = queryClient.getQueryData([KEY_QUERY]) as TLevelUserMenu[];

      const newData = previousData.filter((prevData) => prevData.id !== payload.id);

      queryClient.setQueryData([KEY_QUERY], newData);
      return newData;
    },
  });
};
