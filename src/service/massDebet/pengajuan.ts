import { axiosApiMassDebetV2 } from '@/lib/axios';
import { CHANNEL_CODE, CURR_IDR } from '@/lib/constant';
import { PengajuanMassDebet, ResponsePengajuanMassDebet } from '@/schema/MassDebet/pengajuan';
import { CancelBatchRequest, ResponseCancelBatch } from '@/schema/pengajuanBase';
import { UserLoged } from '@/types/globals';
import { AxiosResponse } from 'axios';
import { formatISO } from 'date-fns';

export const handlerPengajuanMassDebet = async ({
  payload,
  user,
}: {
  payload: PengajuanMassDebet;
  user?: UserLoged;
}) => {
  const requestBody: PengajuanMassDebet = {
    ...payload,

    origin: {
      costCenter: user?.CostCenter || '',
      branchCode: Number(user?.BranchCode || 0),
      isKantorPusat: !!user?.IsKantorPusat,
      channelCode: CHANNEL_CODE,
      costCenterDesc: user?.DescCostCenter || '-',
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

  const { data } = await axiosApiMassDebetV2.post<
    ResponsePengajuanMassDebet,
    AxiosResponse<ResponsePengajuanMassDebet, PengajuanMassDebet>,
    PengajuanMassDebet
  >('/batches', requestBody);

  return data;
};

export const cancelBatchMassDebet = async ({ payload }: { payload: CancelBatchRequest }) => {
  const { data } = await axiosApiMassDebetV2.post<
    ResponseCancelBatch,
    AxiosResponse<ResponseCancelBatch, CancelBatchRequest>,
    CancelBatchRequest
  >('/batches/cancel', payload);

  return data;
};
