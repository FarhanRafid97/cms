import { axiosApiMassCreditV2 } from '@/lib/axios';
import {
  ResponseGetFilterBranchCode,
  ResponseGetFilterCostCenter,
} from '@/schema/MassCredit/filter';
import { ResponseGetParamStatusCode } from '@/schema/MassCreditGLCasa/parameter';

export const getListFilterBranchCode = async () => {
  const { data } = await axiosApiMassCreditV2.get<ResponseGetFilterBranchCode>('/paramBranchCodes');

  return data;
};

export const getListFilterCostCenterMCR = async () => {
  const { data } = await axiosApiMassCreditV2.get<ResponseGetFilterCostCenter>('/paramCostCenters');

  return data;
};

export const getListParamStatusCodeMassCredit = async () => {
  const { data } = await axiosApiMassCreditV2.get<ResponseGetParamStatusCode>(
    '/enumerationStatusCodes',
  );

  return data;
};
