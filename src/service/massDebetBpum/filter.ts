import { axiosApiMassDebetBPUMV2 } from '@/lib/axios';
import {
  ResponseGetFilterBranchCode,
  ResponseGetFilterCostCenter,
} from '@/schema/MassCredit/filter';
import { ResponseGetParamStatusCode } from '@/schema/MassCreditGLCasa/parameter';

export const getListFilterBranchCodeMassDebetBPUM = async () => {
  const { data } = await axiosApiMassDebetBPUMV2.get<ResponseGetFilterBranchCode>(
    '/paramBranchCodes',
  );

  return data;
};

export const getListFilterCostCenterMassDebetBPUM = async () => {
  const { data } = await axiosApiMassDebetBPUMV2.get<ResponseGetFilterCostCenter>(
    '/paramCostCenters',
  );

  return data;
};

export const getListParamStatusCodeMassDebetBPUM = async () => {
  const { data } = await axiosApiMassDebetBPUMV2.get<ResponseGetParamStatusCode>(
    '/enumerationStatusCodes',
  );

  return data;
};
