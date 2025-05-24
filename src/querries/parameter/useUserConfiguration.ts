import {
  FAILED_DELETE_DATA,
  FAILED_GET_DATA,
  FAILED_INSERT_DATA,
  FAILED_UPDATE_DATA,
} from '@/lib/constant';
import {
  TInsertUserConfiguration,
  TUserConfiguration,
  UpdateUserConfiguration,
} from '@/schema/parameter/userConfiguration';
import {
  createUserConfiguration,
  deleteUserConfiguration,
  getListUserConfiguration,
  getSignerOrChecker,
  getUserConfigurationByCostCenter,
  updateUserConfiguration,
} from '@/service/parameter/userConfiguration';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { toast } from 'sonner';

const KEY_QUERY = 'user_configuration';
export const useGetListUserConfiguration = () => {
  return useQuery({
    queryKey: [KEY_QUERY, 'admin'],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getListUserConfiguration(),
  });
};
export const useGetListUserConfigurationCostCenter = () => {
  return useQuery({
    queryKey: [KEY_QUERY, 'cost_center'],
    initialData: [],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getUserConfigurationByCostCenter(),
  });
};

export const useCreateUserConfiguration = ({ type }: { type: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payload,
      levelUserDesc,
    }: {
      payload: TInsertUserConfiguration;
      levelUserDesc: string;
    }) => {
      try {
        const response = await createUserConfiguration({
          payload: payload,
        });
        if (response.isSuccess) {
          toast.success(`success menambahkan ${payload.name}`);
          return { dataResponse: { ...response.result, levelUserDesc } };
        }
        toast.info(response?.errorMessages?.join(', '));
        return { dataResponse: null };
      } catch (error) {
        let message = FAILED_INSERT_DATA;
        if (error instanceof AxiosError && error.response?.data?.errorMessages) {
          message = `${error.response?.data?.errorMessages?.join(', ')}`;
        }
        toast.error(message);
        return { dataResponse: null };
      }
    },

    onSuccess: ({ dataResponse }) => {
      if (dataResponse === null) {
        return;
      }
      const prevData = queryClient.getQueryData([KEY_QUERY, type]) as TUserConfiguration[];
      const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS");
      const newData = [
        {
          ...dataResponse,
          updateDate: formattedDate,
          insertDate: formattedDate,
          oldFIDParamLevelUser: dataResponse?.fidParamLevelUser,
          isNew: true,
        },
        ...prevData,
      ];

      queryClient.setQueryData([KEY_QUERY, type], newData);
    },
  });
};

export const useUpdateUserConfigutartion = ({ type }: { type: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: UpdateUserConfiguration }) => {
      try {
        delete payload['isNew'];
        delete payload['isUpdate'];
        const response = await updateUserConfiguration({ payload });

        if (response.isSuccess) {
          toast.success(`Success update user "${payload.name}"`);
          return { payload, response };
        }
        toast.info(response?.errorMessages?.join(', '));
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

    onSuccess: ({ payload }: { payload: UpdateUserConfiguration | null }) => {
      if (!payload) {
        return;
      }
      const previousData = queryClient.getQueryData([KEY_QUERY, type]) as UpdateUserConfiguration[];

      const newData = previousData.map((data) => {
        if (data.id === payload.id) {
          delete data['isNew'];
          return { isUpdate: true, ...payload };
        }

        return data;
      });

      queryClient.setQueryData([KEY_QUERY, type], newData);
      return newData;
    },
  });
};

export const useDeleteUserConfiguration = ({ type }: { type: string }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      try {
        const response = await deleteUserConfiguration({ id });
        if (response.isSuccess) {
          toast.success(`Success delete user "${id}"`);
          return { id };
        }
        toast.info(response?.errorMessages?.join(', '));

        return { id: null };
      } catch (error) {
        let message = FAILED_DELETE_DATA;
        if (error instanceof AxiosError && error.response?.data?.errorMessages) {
          message = `${error.response?.data?.errorMessages?.join(', ')}`;
        }
        toast.error(message);
        return { id: null };
      }
    },

    onSuccess: ({ id }: { id: number | null }) => {
      if (id === null) {
        return;
      }
      const previousData = queryClient.getQueryData([KEY_QUERY, type]) as TUserConfiguration[];

      const newData = previousData.filter((prevData) => prevData.id !== id);

      queryClient.setQueryData([KEY_QUERY, type], newData);
      return newData;
    },
  });
};

export const useGetCheckerOrSignerInitiator = ({
  isSigner,
  limitTransaction,
  enabled,
  isBpum = false,
}: {
  isSigner: boolean;
  enabled?: boolean;
  isBpum?: boolean;
  limitTransaction: number;
}) => {
  return useQuery({
    queryKey: [KEY_QUERY, isSigner, limitTransaction],
    enabled,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      try {
        const response = await getSignerOrChecker({
          isSigner,
          isBpum,
          limitTransaction,
        });
        if (response.statusCode !== 200) {
          if (response?.errorMessages) {
            toast.info(response.errorMessages.join(','));
          } else {
            toast.info(FAILED_GET_DATA);
          }
        }
        return response.result;
      } catch (error) {
        let message = FAILED_GET_DATA;
        if (error instanceof AxiosError && error.response?.data?.errorMessages) {
          message = error.response?.data?.errorMessages.join(',');
        }
        toast.info(message);
      }
    },
  });
};
