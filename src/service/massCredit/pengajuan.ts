import { axiosApiMassCreditV2 } from '@/lib/axios';
import { CHANNEL_CODE, CURR_IDR } from '@/lib/constant';
import { PengajuanMassCredit, ResponsePengajuanMassCredit } from '@/schema/MassCredit/pengajuan';

import { CancelBatchRequest, ResponseCancelBatch } from '@/schema/pengajuanBase';
import { RequestApproval, ResponseApproval, UserLoged } from '@/types/globals';
import { AxiosResponse } from 'axios';
import { formatISO } from 'date-fns';

export const handlerApprovalMassKredit = async ({ payload }: { payload: RequestApproval }) => {
  const { data } = await axiosApiMassCreditV2.post<
    ResponseApproval,
    AxiosResponse<ResponseApproval, RequestApproval>,
    RequestApproval
  >('/batches/approve', payload);

  return data;
};

export const handlerPengajuanMassKredit = async ({
  payload,
  user,
}: {
  payload: PengajuanMassCredit;
  user?: UserLoged;
}) => {
  const requestBody: PengajuanMassCredit = {
    ...payload,

    origin: {
      costCenter: user?.CostCenter || '',
      branchCode: Number(user?.BranchCode || 0),
      isKantorPusat: !!user?.IsKantorPusat,
      channelCode: CHANNEL_CODE,
      costCenterDesc: user?.DescCostCenter || '',
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

  const { data } = await axiosApiMassCreditV2.post<
    ResponsePengajuanMassCredit,
    AxiosResponse<ResponsePengajuanMassCredit, PengajuanMassCredit>,
    PengajuanMassCredit
  >('/batches', requestBody);

  return data;
};

export const cancelBatchMassCredit = async ({ payload }: { payload: CancelBatchRequest }) => {
  const { data } = await axiosApiMassCreditV2.post<
    ResponseCancelBatch,
    AxiosResponse<ResponseCancelBatch, CancelBatchRequest>,
    CancelBatchRequest
  >('/batches/cancel', payload);

  return data;
};
