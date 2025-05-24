import { FAILED_UPDATE_DATA } from '@/lib/constant';
import { TApplication } from '@/schema/parameter/application';
import { editApplication, getListApplication } from '@/service/parameter/application';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_QUERY = 'List_application';
const CUT_OFF_QUERY = 'CUTT_OFF';

export const useGetListApplication = () => {
  return useQuery({
    queryKey: [KEY_QUERY],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getListApplication(),
  });
};

export const useEditApplicationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: TApplication }) => {
      try {
        const response = await editApplication({ payload });

        if (response.isSuccess) {
          return { payload, response };
        }
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

    onSuccess: ({ response, payload }) => {
      if (!response) {
        return;
      }

      const previousComments = queryClient.getQueryData([KEY_QUERY]) as TApplication[];

      const cutOff: { CutOffStart: string; CutOffEnd: string } = {
        CutOffEnd: '',
        CutOffStart: '',
      };

      const updatedData = previousComments.map((application) => {
        const isUpdatedApplication = application.id === response.result.id;
        const updatedApplication = isUpdatedApplication
          ? { isUpdate: true, ...response.result }
          : application;

        if (payload.description === 'CutOffStart' || payload.description === 'CutOffEnd') {
          if (
            updatedApplication.description === 'CutOffStart' ||
            updatedApplication.description === 'CutOffEnd'
          ) {
            cutOff[updatedApplication.description] = updatedApplication.value;
          }
        }

        return updatedApplication;
      });

      // Set query data with updated cutOff and updatedData
      if (payload.description === 'CutOffStart' || payload.description === 'CutOffEnd') {
        queryClient.setQueryData([CUT_OFF_QUERY], cutOff);
      }

      queryClient.setQueryData([KEY_QUERY], updatedData);
      return updatedData;
    },
  });
};

export const useGetCutOff = () => {
  return useQuery({
    queryKey: [CUT_OFF_QUERY],

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const respones = await getListApplication();
      const cutOff: { CutOffStart: string; CutOffEnd: string } = { CutOffEnd: '', CutOffStart: '' };
      respones.forEach((d) => {
        if (d.description === 'CutOffStart' || d.description === 'CutOffEnd') {
          cutOff[d.description] = d.value;
        }
      });
      return cutOff;
    },
  });
};
