import { axiosApiMCRGLCasa } from '@/lib/axios';
import { CHANNEL_CODE, CURR_IDR } from '@/lib/constant';
import {
  PengajuanMassCreditGLCasa,
  RequestApprovalMassGL,
  ResponseApprovalMassGL,
  ResponsePengajuanMassKreditGLCasa,
} from '@/schema/MassCreditGLCasa/pengajuan';
import { CancelBatchRequest, ResponseCancelBatch } from '@/schema/pengajuanBase';
import { UserLoged } from '@/types/globals';
import { AxiosResponse } from 'axios';
import { formatISO } from 'date-fns';

export const handlerPengajuanMassKreditGLCasa = async ({
  payload,
  user,
}: {
  payload: PengajuanMassCreditGLCasa;
  user?: UserLoged;
}) => {
  const requestBody: PengajuanMassCreditGLCasa = {
    ...payload,

    origin: {
      costCenter: user?.CostCenter || '',
      costCenterDesc: user?.DescCostCenter || '',
      branchCode: Number(user?.BranchCode || 0),
      isHeadquarters: !!user?.IsKantorPusat,
      channelCode: CHANNEL_CODE,
      sourceApplication: CHANNEL_CODE,
    },
    pengajuan: {
      ...payload.pengajuan,
      currency: CURR_IDR,

      effectiveDate: formatISO(payload.pengajuan.effectiveDate),
    },
    fee: {
      ...payload.fee,
    },
  };

  const { data } = await axiosApiMCRGLCasa.post<
    ResponsePengajuanMassKreditGLCasa,
    AxiosResponse<ResponsePengajuanMassKreditGLCasa, PengajuanMassCreditGLCasa>,
    PengajuanMassCreditGLCasa
  >('/batches', requestBody);

  return data;
};

export const handlerApprovalMassGL = async ({ payload }: { payload: RequestApprovalMassGL }) => {
  const { data } = await axiosApiMCRGLCasa.post<
    ResponseApprovalMassGL,
    AxiosResponse<ResponseApprovalMassGL, RequestApprovalMassGL>,
    RequestApprovalMassGL
  >('/batches/approve', payload);

  return data;
};

export const handlerCancelPengajuanMassKreditGLCasa = async ({
  payload,
}: {
  payload: CancelBatchRequest;
}) => {
  const { data } = await axiosApiMCRGLCasa.post<
    ResponseCancelBatch,
    AxiosResponse<ResponseCancelBatch, CancelBatchRequest>,
    CancelBatchRequest
  >('/batches/cancel', payload);

  return data;
};
