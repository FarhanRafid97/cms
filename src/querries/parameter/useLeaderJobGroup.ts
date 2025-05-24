import {
  FAILED_INSERT_DATA,
  FAILED_UPDATE_DATA,
  MESSAGE_SUCCESS_DELETE_DATA,
} from '@/lib/constant';
import { TInsertLeaderJobGroup, TLeaderJobGroup } from '@/schema/parameter/LeaderJobGroup';
import {
  addParamLeaderJobGroup,
  deleteParamLeaderJobGroup,
  getListLeaderJobGroup,
  updateParamLeaderJobGroup,
} from '@/service/parameter/LeaderJobGroup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_QUERY = 'List_Leader_Job_Group';

export const useGetListLeaderJobGroup = () => {
  return useQuery({
    queryKey: [KEY_QUERY],
    initialData: [],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getListLeaderJobGroup(),
  });
};

export const useAddLeaderJobGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TInsertLeaderJobGroup }) => {
      try {
        const response = await addParamLeaderJobGroup({
          payload: { jobGroup: payload.jobGroup, jobGroupDescription: payload.jobGroupDescription },
        });

        if (response.isSuccess) {
          return { response };
        }
        toast.info(response?.errorMessages.join(', '));
        return { response: null };
      } catch (error) {
        let errorMsg = FAILED_INSERT_DATA;

        if (error instanceof AxiosError && error.response?.data?.errorMessages) {
          errorMsg = error.response?.data?.errorMessages?.join(', ');
        }
        toast.error(errorMsg);
        return { payload: null };
      }
    },

    onSuccess: ({ response }) => {
      if (!response) {
        return;
      }
      const previousData = queryClient.getQueryData([KEY_QUERY]) as TLeaderJobGroup[];

      const newData = [...previousData, { ...response.result, isNew: true }];

      queryClient.setQueryData([KEY_QUERY], newData);
      return newData;
    },
  });
};

export const useUpdateLeaderJobGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TLeaderJobGroup }) => {
      try {
        const response = await updateParamLeaderJobGroup({ payload });
        if (response.isSuccess) {
          return { payload, response };
        }
        toast.info(response?.errorMessages?.join(','));
        return { payload: null, response: null };
      } catch (error) {
        let errorMsg = FAILED_UPDATE_DATA;

        if (error instanceof AxiosError && error.response?.data?.errorMessages) {
          errorMsg = error.response?.data?.errorMessages?.join(', ');
        }
        toast.error(errorMsg);
        return { payload: null, response: null };
      }
    },

    onSuccess: ({ payload }) => {
      if (!payload) {
        return;
      }
      const previousData = queryClient.getQueryData([KEY_QUERY]) as TLeaderJobGroup[];

      const newData = previousData.map((leaderJobGroup) =>
        leaderJobGroup.id === payload.id ? { isUpdate: true, ...payload } : leaderJobGroup,
      );

      queryClient.setQueryData([KEY_QUERY], newData);
      return newData;
    },
  });
};

export const useDeleteLeaderJobGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TLeaderJobGroup }) => {
      try {
        const response = await deleteParamLeaderJobGroup({ payload });
        if (response.isSuccess) {
          toast.success(MESSAGE_SUCCESS_DELETE_DATA);
          return { payload };
        }
        toast.info(response.errorMessages.join(', '));
        return { payload: null };
      } catch (error) {
        let errorMsg = 'Failed Delete';

        if (error instanceof AxiosError && error.response?.data?.errorMessages) {
          errorMsg = error.response?.data?.errorMessages?.join(',');
        }
        toast.error(errorMsg);
        return { payload: null };
      }
    },

    onSuccess: ({ payload }: { payload: TLeaderJobGroup | null }) => {
      if (payload === null) {
        return;
      }
      const previousData = queryClient.getQueryData([KEY_QUERY]) as TLeaderJobGroup[];

      const newData = previousData.filter((leaderJobGroup) => leaderJobGroup.id !== payload.id);

      queryClient.setQueryData([KEY_QUERY], newData);
      return newData;
    },
  });
};
