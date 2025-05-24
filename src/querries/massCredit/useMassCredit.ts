import { useGetFilterSearchparams } from '@/hooks/useGetSearchParams';
import { FAILED_UPDATE_DATA } from '@/lib/constant';
import { PengajuanMassCredit } from '@/schema/MassCredit/pengajuan';
import { ResponesGetReportMassCredit } from '@/schema/MassCredit/report';
import { CancelBatchRequest } from '@/schema/pengajuanBase';
import {
  cancelBatchMassCredit,
  handlerApprovalMassKredit,
  handlerPengajuanMassKredit,
} from '@/service/massCredit/pengajuan';
import {
  getDetailPreBatchMassCredit,
  getDetailSumaryBatchMassKredit,
  getReportApprovalMassKredit,
  getReportDetailMassKredit,
  getReportPengajuanMassCredit,
} from '@/service/massCredit/report';
import { FilterSearchParams, LevelUserDefault, RequestApproval, UserLoged } from '@/types/globals';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_REPORT_MASS_CREDIT = 'report_mass_credit';
const KEY_APPROVAL_MASS_CREDIT = 'KEY_APPROVAL_MASS_CREDIT';
const KEY_SUMARY_MASS_CREDIT = 'KEY_SUMARY_MASS_CREDIT';
const KEY_DETAIL_MASS_CREDIT = 'KEY_DETAIL_MASS_CREDIT';
const KEY_PREBATCH_MASS_CREDIT = 'KEY_PREBATCH_MASS_CREDIT ';

export const useGetReportMassCredit = ({ searchParams }: { searchParams: FilterSearchParams }) => {
  return useQuery({
    queryKey: [KEY_REPORT_MASS_CREDIT, JSON.stringify(searchParams)],

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getReportPengajuanMassCredit({ searchParams }),
  });
};

export const useGetReportDetailMassKredit = ({
  batchNumber,
  searchParams,
  enabled,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [KEY_DETAIL_MASS_CREDIT, JSON.stringify(searchParams), batchNumber],

    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getReportDetailMassKredit({ searchParams, batchNumber }),
  });
};

export const useGetApprovalMassCredit = ({
  searchParams,
  level,
}: {
  level: LevelUserDefault;
  searchParams: FilterSearchParams;
}) => {
  return useQuery({
    queryKey: [KEY_APPROVAL_MASS_CREDIT, JSON.stringify(searchParams)],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getReportApprovalMassKredit({ searchParams, level }),
  });
};

export const useGetDetailSumaryBatchMassKredit = ({
  payload,
}: {
  payload: {
    batchNumber: string;
  };
}) => {
  return useQuery({
    queryKey: [KEY_SUMARY_MASS_CREDIT, payload],
    staleTime: 10000,
    enabled: !!payload?.batchNumber,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getDetailSumaryBatchMassKredit({ payload }),
  });
};

export const useApprovalMassKredit = () => {
  const { search } = useGetFilterSearchparams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: RequestApproval }) => {
      try {
        const response = await handlerApprovalMassKredit({ payload });
        if (response.status === '00') {
          return { response, payload };
        }
        toast.info(response.message);
        return { response: null, payload: null };
      } catch (error) {
        let message = FAILED_UPDATE_DATA;
        if (error instanceof AxiosError && error.response?.data?.errorMessages) {
          message = `${error.response?.data?.errorMessages?.join(', ')}`;
        }
        toast.error(message);
        return { payload: null, response: null };
      }
    },
    onSuccess: ({ payload, response }) => {
      if (!response || !payload) {
        return;
      }

      const key = [KEY_APPROVAL_MASS_CREDIT, JSON.stringify(search)];
      const previousData = queryClient.getQueryData(key) as ResponesGetReportMassCredit;
      if (previousData) {
        const newDataBatch = previousData?.data.batch.map((d) => {
          if (d.batchNumber === payload.batchNumber) {
            switch (payload.role) {
              case 'checker':
                return {
                  ...d,
                  isUpdate: true,
                  batchApproval: {
                    ...d.batchApproval,
                    checkerDate: response.data.approvalDate,

                    checkerNote: payload.notes,
                  },
                  status: response.data.status,
                  statusDesc: response.data.statusDesc,
                };
              case 'signer':
                return {
                  ...d,
                  isUpdate: true,
                  batchApproval: {
                    ...d.batchApproval,
                    signerDate: response.data.approvalDate,
                    signerNote: payload.notes,
                  },
                  status: response.data.status,
                  statusDesc: response.data.statusDesc,
                };

              default:
                return d;
            }
          }
          return d;
        });
        toast.success(response.data.statusDesc);
        const responseFinal: ResponesGetReportMassCredit = {
          ...previousData,
          data: {
            pagination: previousData.data.pagination,
            batch: newDataBatch,
          },
        };
        return queryClient.setQueryData<ResponesGetReportMassCredit>(key, responseFinal);
      }
    },
  });
};

export const usePengajuanMassKredit = () => {
  return useMutation({
    mutationFn: async ({
      payload,
      user,
    }: {
      payload: PengajuanMassCredit;
      user: UserLoged | undefined;
    }) => {
      return handlerPengajuanMassKredit({ payload, user });
    },
  });
};

export const useGetDetailPreBatchMassCredit = ({
  batchNumber,
  searchParams,
  enabled,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [KEY_PREBATCH_MASS_CREDIT, JSON.stringify(searchParams), batchNumber],
    staleTime: 5000,
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getDetailPreBatchMassCredit({ searchParams, batchNumber }),
  });
};

export const useCancelBatchMassCredit = () => {
  const { search } = useGetFilterSearchparams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: CancelBatchRequest }) => {
      try {
        const response = await cancelBatchMassCredit({ payload });

        if (response.status === '00') {
          return { response, payload };
        }

        return { payload: null, response: response };
      } catch (error) {
        return { payload: null, response: null };
      }
    },
    onSuccess: ({ payload, response }) => {
      if (!response || !payload) {
        return;
      }

      const key = [KEY_REPORT_MASS_CREDIT, JSON.stringify(search)];
      const previousData = queryClient.getQueryData(key) as ResponesGetReportMassCredit;
      if (previousData) {
        const newDataBatch = previousData?.data.batch.map((d) => {
          if (d.batchNumber === payload.batchNumber) {
            return {
              ...d,
              isError: true,
              status: response.data.status,
              statusDesc: response.data.statusDesc,
            };
          }
          return d;
        });
        toast.success(response.data.statusDesc);
        const responseFinal: ResponesGetReportMassCredit = {
          ...previousData,
          data: {
            pagination: previousData.data.pagination,
            batch: newDataBatch,
          },
        };
        return queryClient.setQueryData<ResponesGetReportMassCredit>(key, responseFinal);
      }
    },
  });
};
