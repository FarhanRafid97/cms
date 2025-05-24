import { RequestParamInquiryGLAccount } from '@/schema/MassCreditGLCasa/parameter';
import {
  getAccountGL,
  getListBranchCode,
  getListParamChanel,
  getListParamParamTransactionType,
  getListParamStatusCode,
} from '@/service/massGL/parameter';
import { getListParamCostCenter } from '@/service/parameter/costCenter';
import { DefaultOptionSelectDropDown } from '@/types/globals';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';

export const useGetOptionParamChannel = () => {
  return useQuery({
    queryKey: ['PARAM_FILTER_CHANNEL'],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListParamChanel();

      const optionForParamChannel: DefaultOptionSelectDropDown[] = response.data.map((channel) => {
        return {
          label: channel.channelName,
          value: channel.channelCode,
        };
      });

      return optionForParamChannel;
    },
  });
};
export const useGetOptionParamStatusCode = () => {
  return useQuery({
    queryKey: ['PARAM_FILTER_STATUS_CODE'],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListParamStatusCode();

      const optionForParamChannel: DefaultOptionSelectDropDown[] = response.data.map((status) => {
        return {
          label: status.statusDesc,
          value: status.status + '',
        };
      });

      return optionForParamChannel;
    },
  });
};

export const useGetOptionParamCostCenter = ({ enabled = true }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['PARAM_FILTER_COST_CENTER'],
    staleTime: 5000,
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListParamCostCenter();

      const optionForParamChannel: DefaultOptionSelectDropDown[] = response.data.map((status) => {
        return {
          label: status.division,
          value: status.costCenter + '',
        };
      });

      return optionForParamChannel;
    },
  });
};
export const useGetOptionParamTransactionType = ({
  isPengajuan = false,
  session,
}: {
  isPengajuan?: boolean;
  session?: Session | null;
}) => {
  return useQuery({
    queryKey: ['PARAM_FILTER_TRANSACTION_TYPE'],
    staleTime: 15000,
    enabled: !isPengajuan || !!session,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListParamParamTransactionType();

      const isNonProductOwner = isPengajuan && !session?.user.IsProductOwner;

      return response.data.reduce<DefaultOptionSelectDropDown[]>((acc, transactionType) => {
        if (!isNonProductOwner || !transactionType.isProductOwner) {
          acc.push({
            label: transactionType.type,
            value: transactionType.code + '',
          });
        }
        return acc;
      }, []);
    },
  });
};

export const useGetGLAccount = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: RequestParamInquiryGLAccount }) => {
      return getAccountGL({ payload });
    },
  });
};

export const useGetOptionParamBranchCode = () => {
  return useQuery({
    queryKey: ['PARAM_FILTER_BRANCH_CODE'],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      const response = await getListBranchCode();

      const optionForParamChannel: DefaultOptionSelectDropDown[] = response.data.branchs.map(
        (transactionType) => {
          return {
            label: transactionType + '',
            value: transactionType + '',
          };
        },
      );

      return optionForParamChannel;
    },
  });
};
