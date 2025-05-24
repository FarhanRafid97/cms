import { useGetFilterSearchparams } from '@/hooks/useGetSearchParams';
import { FAILED_GET_DATA, FAILED_UPDATE_DATA } from '@/lib/constant';
import { PengajuanMassDebet } from '@/schema/MassDebet/pengajuan';
import { ResponesGetReportMassDebet } from '@/schema/MassDebet/report';
import { CancelBatchRequest } from '@/schema/pengajuanBase';
import { cancelBatchMassDebet, handlerPengajuanMassDebet } from '@/service/massDebet/pengajuan';
import {
  getDetailPreBatchMassDebet,
  getDetailSumaryBatchMassDebet,
  getReportApprovalMassDebet,
  getReportDetailMassDebet,
  getReportPengajuanMassDebet,
  handlerApprovalMassDebet,
} from '@/service/massDebet/report';
import { FilterSearchParams, LevelUserDefault, RequestApproval, UserLoged } from '@/types/globals';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_REPORT_MDB = 'report_mass_debet';
const KEY_APPROVAL_MDB = 'KEY_APPROVAL_MDB';
const KEY_DETAIL_MDB = 'KEY_DETAIL_MDB';
const KEY_SUMMARY_MDB = 'KEY_SUMMARY_MDB';
const KEY_PREBATCH_MDB = 'KEY_PREBATCH_MDB';

export const useGetReportMassDebet = ({ searchParams }: { searchParams: FilterSearchParams }) => {
  return useQuery({
    queryKey: [KEY_REPORT_MDB, JSON.stringify(searchParams)],

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getReportPengajuanMassDebet({ searchParams }),
  });
};

export const useGetApprovalMassDebet = ({
  searchParams,
  level,
}: {
  level: LevelUserDefault;
  searchParams: FilterSearchParams;
}) => {
  return useQuery({
    queryKey: [KEY_APPROVAL_MDB, JSON.stringify(searchParams)],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getReportApprovalMassDebet({ searchParams, level }),
  });
};

export const useGetReportDetailMassDebet = ({
  batchNumber,
  searchParams,
  enabled,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [KEY_DETAIL_MDB, JSON.stringify(searchParams), batchNumber],

    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getReportDetailMassDebet({ searchParams, batchNumber }),
  });
};

export const useGetDetailSumaryBatchMassDebet = ({
  payload,
}: {
  payload: {
    batchNumber: string;
  };
}) => {
  return useQuery({
    queryKey: [KEY_SUMMARY_MDB, payload],
    staleTime: 5000,
    enabled: !!payload?.batchNumber,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      try {
        const response = await getDetailSumaryBatchMassDebet({ payload });
        if (response.status !== '00') {
          toast.info(response.message);
        }
        return response;
      } catch (error) {
        let message = FAILED_GET_DATA;
        if (error instanceof AxiosError) {
          message = `${error.response?.data?.errorMessages?.join(', ')}`;
        }
        toast.error(message);

        return undefined;
      }
    },
  });
};

export const useApprovalMassDebet = () => {
  const { search } = useGetFilterSearchparams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: RequestApproval }) => {
      try {
        const response = await handlerApprovalMassDebet({ payload });
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

      const key = [KEY_APPROVAL_MDB, JSON.stringify(search)];
      const previousData = queryClient.getQueryData(key) as ResponesGetReportMassDebet;
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
        const responseFinal: ResponesGetReportMassDebet = {
          ...previousData,
          data: {
            pagination: previousData.data.pagination,
            batch: newDataBatch,
          },
        };
        return queryClient.setQueryData<ResponesGetReportMassDebet>(key, responseFinal);
      }
    },
  });
};

export const usePengajuanMassDebet = () => {
  return useMutation({
    mutationFn: async ({
      payload,
      user,
    }: {
      payload: PengajuanMassDebet;
      user: UserLoged | undefined;
    }) => {
      return handlerPengajuanMassDebet({ payload, user });
    },
  });
};

export const useGetDetailPreBatchMassDebet = ({
  batchNumber,
  searchParams,
  enabled,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [KEY_PREBATCH_MDB, JSON.stringify(searchParams), batchNumber],
    staleTime: 5000,
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getDetailPreBatchMassDebet({ searchParams, batchNumber }),
  });
};

export const useCancelBatchMassDebet = () => {
  const { search } = useGetFilterSearchparams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: CancelBatchRequest }) => {
      try {
        const response = await cancelBatchMassDebet({ payload });

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

      const key = [KEY_REPORT_MDB, JSON.stringify(search)];
      const previousData = queryClient.getQueryData(key) as ResponesGetReportMassDebet;
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
        const responseFinal: ResponesGetReportMassDebet = {
          ...previousData,
          data: {
            pagination: previousData.data.pagination,
            batch: newDataBatch,
          },
        };
        return queryClient.setQueryData<ResponesGetReportMassDebet>(key, responseFinal);
      }
    },
  });
};
