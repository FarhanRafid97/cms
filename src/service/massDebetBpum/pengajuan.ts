import { axiosApiMassDebetBPUMV2 } from '@/lib/axios';
import { CHANNEL_CODE, CURR_IDR } from '@/lib/constant';
import { PengajuanMassDebet, ResponsePengajuanMassDebet } from '@/schema/MassDebet/pengajuan';
import { RequestApproval, ResponseApproval, UserLoged } from '@/types/globals';
import { AxiosResponse } from 'axios';
import { formatISO } from 'date-fns';

export const handlerPengajuanMassDebetBPUM = async ({
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

  const { data } = await axiosApiMassDebetBPUMV2.post<
    ResponsePengajuanMassDebet,
    AxiosResponse<ResponsePengajuanMassDebet, PengajuanMassDebet>,
    PengajuanMassDebet
  >('/batches', requestBody);

  return data;
};

export const handlerApprovalMassDebetBPUM = async ({ payload }: { payload: RequestApproval }) => {
  const { data } = await axiosApiMassDebetBPUMV2.post<
    ResponseApproval,
    AxiosResponse<ResponseApproval, RequestApproval>,
    RequestApproval
  >('/batches/approve', payload);

  return data;
};
