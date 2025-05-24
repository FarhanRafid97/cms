import { axiosApiMassDebetV2 } from '@/lib/axios';
import {
  ResponseGetFilterBranchCode,
  ResponseGetFilterCostCenter,
} from '@/schema/MassCredit/filter';

export const getListFilterBranchCodeMDB = async () => {
  const { data } = await axiosApiMassDebetV2.get<ResponseGetFilterBranchCode>('/paramBranchCodes');

  return data;
};

export const getListFilterCostCenterMDB = async () => {
  const { data } = await axiosApiMassDebetV2.get<ResponseGetFilterCostCenter>('/paramCostCenters');

  return data;
};
