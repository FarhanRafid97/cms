import { useGetFilterSearchparams } from '@/hooks/useGetSearchParams';
import { FAILED_GET_DATA, FAILED_UPDATE_DATA } from '@/lib/constant';
import { PengajuanMassDebet } from '@/schema/MassDebet/pengajuan';
import { ResponesGetReportMassDebetBPUM } from '@/schema/MassDebetBPUM/report';
import {
  handlerApprovalMassDebetBPUM,
  handlerPengajuanMassDebetBPUM,
} from '@/service/massDebetBpum/pengajuan';
import {
  getDetailPreBatchMassDebetBPUM,
  getReportApprovalMassDebetBPUM,
  getReportDetailMassDebetBPUM,
  getReportPengajuanMassDebetBPUM,
  getSummaryBatchMassDebetBPUM,
  handleDownloadFileMassDebetBPUM,
} from '@/service/massDebetBpum/report';
import { FilterSearchParams, LevelUserDefault, RequestApproval, UserLoged } from '@/types/globals';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_REPORT_MDB_BPUM = 'report_mass_debet_bpum ';
const KEY_REPORT_MDB_BPUM_SUMMARY = 'KEY_REPORT_MDB_BPUM_SUMMARY ';
const KEY_APPROVAL_MDB_BPUM = 'KEY_APPROVAL_MDB_BPUM ';
const KEY_PREBATCH_MDB_BPUM = 'KEY_PREBATCH_MDB_BPUM';
const KEY_DETAIL_MDB_BPUM = 'KEY_DETAIL_MDB_BPUM';

export const useGetReportMassDebetBPUM = ({
  searchParams,
}: {
  searchParams: FilterSearchParams;
}) => {
  return useQuery({
    queryKey: [KEY_REPORT_MDB_BPUM, JSON.stringify(searchParams)],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getReportPengajuanMassDebetBPUM({ searchParams: searchParams }),
  });
};
export const useGetReportApprovalMassDebetBPUM = ({
  searchParams,
  level,
}: {
  level: LevelUserDefault;
  searchParams: FilterSearchParams;
}) => {
  return useQuery({
    queryKey: [KEY_APPROVAL_MDB_BPUM, JSON.stringify(searchParams)],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getReportApprovalMassDebetBPUM({ searchParams, level }),
  });
};

export const usePengajuanMassDebetBpumMutation = () => {
  return useMutation({
    mutationFn: async ({
      payload,
      user,
    }: {
      payload: PengajuanMassDebet;
      user: UserLoged | undefined;
    }) => {
      return handlerPengajuanMassDebetBPUM({ payload, user });
    },
  });
};

export const useApprovalMassDebetBPUM = () => {
  const { search } = useGetFilterSearchparams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: RequestApproval }) => {
      try {
        const response = await handlerApprovalMassDebetBPUM({ payload });
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

      const key = [KEY_APPROVAL_MDB_BPUM, JSON.stringify(search)];
      const previousData = queryClient.getQueryData(key) as ResponesGetReportMassDebetBPUM;
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
        const responseFinal: ResponesGetReportMassDebetBPUM = {
          ...previousData,
          data: {
            pagination: previousData.data.pagination,
            batch: newDataBatch,
          },
        };
        return queryClient.setQueryData<ResponesGetReportMassDebetBPUM>(key, responseFinal);
      }
    },
  });
};

export const useGetDetailSummaryBatchMassDebetBPUM = ({
  payload,
}: {
  payload: {
    batchNumber: string;
  };
}) => {
  return useQuery({
    queryKey: [KEY_REPORT_MDB_BPUM_SUMMARY, payload],
    staleTime: 5000,
    enabled: !!payload?.batchNumber,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      try {
        const response = await getSummaryBatchMassDebetBPUM({ payload });
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

export const useDownloadFileMassDebetBPUM = () => {
  return useMutation({
    mutationFn: async ({ fileName }: { fileName: string }) =>
      handleDownloadFileMassDebetBPUM({ fileName }),
  });
};

export const useGetDetailPreBatchMassDebetBPUM = ({
  batchNumber,
  searchParams,
  enabled,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [KEY_PREBATCH_MDB_BPUM, JSON.stringify(searchParams), batchNumber],
    staleTime: 5000,
    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getDetailPreBatchMassDebetBPUM({ searchParams, batchNumber }),
  });
};

export const useGetReportDetailMassDebetBPUM = ({
  batchNumber,
  searchParams,
  enabled,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [KEY_DETAIL_MDB_BPUM, JSON.stringify(searchParams), batchNumber],

    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getReportDetailMassDebetBPUM({ searchParams, batchNumber }),
  });
};
