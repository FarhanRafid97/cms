import { axiosApiMCRGLCasa } from '@/lib/axios';
import {
  RequestParamInquiryGLAccount,
  ResponseGetParamChannel,
  ResponseGetParamInquiryGLAccount,
  ResponseGetParamStatusCode,
  ResponseGetParamTransactionType,
} from '@/schema/MassCreditGLCasa/parameter';
import { BaseApiResponseMCRGL } from '@/types/globals';
import { AxiosResponse } from 'axios';

export const getListParamChanel = async () => {
  const { data } = await axiosApiMCRGLCasa.get<ResponseGetParamChannel>('/paramChannels');

  return data;
};
export const getListParamStatusCode = async () => {
  const { data } = await axiosApiMCRGLCasa.post<ResponseGetParamStatusCode>(
    '/enumerationStatusCodes',
    {
      process: 'ReportFilter',
    },
  );

  return data;
};

export const getListParamParamTransactionType = async () => {
  const { data } = await axiosApiMCRGLCasa.get<ResponseGetParamTransactionType>(
    '/paramTransactionTypes',
  );

  return data;
};

export const getAccountGL = async ({ payload }: { payload: RequestParamInquiryGLAccount }) => {
  const { data } = await axiosApiMCRGLCasa.post<
    ResponseGetParamInquiryGLAccount,
    AxiosResponse<ResponseGetParamInquiryGLAccount, RequestParamInquiryGLAccount>,
    RequestParamInquiryGLAccount
  >('/glAccount/inquiryDetailByGLReff', payload);

  return data;
};

export const getListBranchCode = async () => {
  const { data } = await axiosApiMCRGLCasa.get<
    BaseApiResponseMCRGL & { data: { branchs: number[] } }
  >('/paramBranchGLs');

  return data;
};
