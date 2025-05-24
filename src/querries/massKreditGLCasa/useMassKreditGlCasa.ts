import { useGetFilterSearchparams } from '@/hooks/useGetSearchParams';
import { FAILED_UPDATE_DATA } from '@/lib/constant';
import {
  PengajuanMassCreditGLCasa,
  RequestApprovalMassGL,
} from '@/schema/MassCreditGLCasa/pengajuan';
import { ResponesGetReportMassCreditGLCasa } from '@/schema/MassCreditGLCasa/report';
import { CancelBatchRequest } from '@/schema/pengajuanBase';
import {
  handlerApprovalMassGL,
  handlerCancelPengajuanMassKreditGLCasa,
  handlerPengajuanMassKreditGLCasa,
} from '@/service/massGL/pengajuan';
import {
  getDetailPreBatchMassGL,
  getDetailSumaryBatchGLCasa,
  getListUploadFileGLCasa,
  getReportApprovalMassGL,
  getReportDetailMassKreditGLCasa,
  getReportMassKreditGLCasa,
} from '@/service/massGL/report';
import {
  FilterSearchParams,
  LevelUserDefault,
  RequestBodyUploadFile,
  UserLoged,
} from '@/types/globals';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const KEY_REPORT_MCR_GL_CASA = 'report_mass_credit_gl_casa';
const KEY_REPORT_APPROVAL_MCR_GL_CASA = 'report_mass_credit_gl_casa';
const KEY_PREBATCH_MCR_GL_CASA = 'KEY_PREBATCH_MCR_GL_CASA';
const KEY_DETAIL_MCR_GL_CASA = 'KEY_DETAIL_MCR_GL_CASA';
const KEY_SUMMARY_MCR_GL_CASA = 'KEY_SUMMARY_MCR_GL_CASA';

export const useGetReportMassKreditGLCasa = ({
  searchParams,
  enabled,
}: {
  searchParams: FilterSearchParams;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [KEY_REPORT_MCR_GL_CASA, JSON.stringify(searchParams)],

    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getReportMassKreditGLCasa({ searchParams }),
  });
};

export const useGetReportApprovalMassGL = ({
  searchParams,
  level,
}: {
  level: LevelUserDefault;
  searchParams: FilterSearchParams;
}) => {
  return useQuery({
    queryKey: [KEY_REPORT_APPROVAL_MCR_GL_CASA, JSON.stringify(searchParams)],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getReportApprovalMassGL({ searchParams, level }),
  });
};

export const useGetDetailSumaryBatchGLCasa = ({
  payload,
}: {
  payload: {
    batchNumber: string;
  };
}) => {
  return useQuery({
    queryKey: [KEY_SUMMARY_MCR_GL_CASA, payload],
    staleTime: 5000,
    enabled: !!payload?.batchNumber,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getDetailSumaryBatchGLCasa({ payload }),
  });
};

export const useGetUploadFileGLCasa = ({ request }: { request?: RequestBodyUploadFile }) => {
  return useQuery({
    queryKey: ['upload_file_gl_casa'],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getListUploadFileGLCasa({ request }),
  });
};

export const usePengajuanMassKreditGLCasa = () => {
  return useMutation({
    mutationFn: async ({
      payload,
      user,
    }: {
      payload: PengajuanMassCreditGLCasa;
      user: UserLoged | undefined;
    }) => {
      return handlerPengajuanMassKreditGLCasa({ payload, user });
    },
  });
};

export const useApprovalMassGL = () => {
  const { search } = useGetFilterSearchparams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: RequestApprovalMassGL }) => {
      try {
        const response = await handlerApprovalMassGL({ payload });
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

      const key = [KEY_REPORT_APPROVAL_MCR_GL_CASA, JSON.stringify(search)];
      const previousData = queryClient.getQueryData(key) as ResponesGetReportMassCreditGLCasa;
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
                    statusApproval: response.data.batchApprovalStatus,
                    checkerDate: response.data.approvalDate,
                    checkerNote: payload.notes,
                  },
                  status: response.data.batchStatus,
                  statusDesc: response.data.batchStatusDesc,
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
                  status: response.data.batchStatus,
                  statusDesc: response.data.batchStatusDesc,
                };

              default:
                return d;
            }
          }
          return d;
        });
        toast.success(response.data.batchApprovalStatusDesc);
        const responseFinal: ResponesGetReportMassCreditGLCasa = {
          ...previousData,
          data: {
            pagination: previousData.data.pagination,
            batch: newDataBatch,
          },
        };
        return queryClient.setQueryData<ResponesGetReportMassCreditGLCasa>(key, responseFinal);
      }
    },
  });
};

export const useCancelMassGLCasa = () => {
  const { search } = useGetFilterSearchparams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ payload }: { payload: CancelBatchRequest }) => {
      try {
        const response = await handlerCancelPengajuanMassKreditGLCasa({ payload });

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

      const key = [KEY_REPORT_MCR_GL_CASA, JSON.stringify(search)];
      const previousData = queryClient.getQueryData(key) as ResponesGetReportMassCreditGLCasa;
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
        const responseFinal: ResponesGetReportMassCreditGLCasa = {
          ...previousData,
          data: {
            pagination: previousData.data.pagination,
            batch: newDataBatch,
          },
        };
        return queryClient.setQueryData<ResponesGetReportMassCreditGLCasa>(key, responseFinal);
      }
    },
  });
};

export const useGetReportDetailMassKreditGLCasa = ({
  batchNumber,
  searchParams,
  enabled,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [KEY_DETAIL_MCR_GL_CASA, JSON.stringify(searchParams), batchNumber],

    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getReportDetailMassKreditGLCasa({ searchParams, batchNumber }),
  });
};
export const useGetDetailPreBatchMassGL = ({
  batchNumber,
  searchParams,
  enabled,
}: {
  batchNumber: number;
  searchParams: FilterSearchParams;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: [KEY_PREBATCH_MCR_GL_CASA, JSON.stringify(searchParams), batchNumber],

    enabled,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getDetailPreBatchMassGL({ searchParams, batchNumber }),
  });
};
