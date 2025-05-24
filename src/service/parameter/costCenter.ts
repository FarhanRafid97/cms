import { axiosApiMCRGLCasa } from '@/lib/axios';

import {
  CreateParamCostCenterRequestType,
  ResponseCreateParamCostCenter,
  ResponseGetParamCostCenter,
  UpdateParamCostCenterRequestType,
} from '@/schema/parameter/costCenter';
import { AxiosResponse } from 'axios';

export const createParamCostcenter = async ({
  payload,
}: {
  payload: CreateParamCostCenterRequestType;
}) => {
  const { data } = await axiosApiMCRGLCasa.post<
    ResponseCreateParamCostCenter,
    AxiosResponse<ResponseCreateParamCostCenter, CreateParamCostCenterRequestType>,
    CreateParamCostCenterRequestType
  >('/paramCostCenters', payload);
  return data;
};

export const getListParamCostCenter = async () => {
  const { data } = await axiosApiMCRGLCasa.get<ResponseGetParamCostCenter>('/paramCostCenters');

  return data;
};

export const updateParamCostcenter = async ({
  payload,
}: {
  payload: UpdateParamCostCenterRequestType;
}) => {
  const { data } = await axiosApiMCRGLCasa.put<
    ResponseCreateParamCostCenter,
    AxiosResponse<ResponseCreateParamCostCenter, UpdateParamCostCenterRequestType>,
    UpdateParamCostCenterRequestType
  >(`/paramCostCenters/${payload.ID}`, payload);

  return data;
};
export const deleteParamCostcenter = async ({ id }: { id: number }) => {
  const { data } = await axiosApiMCRGLCasa.delete<ResponseCreateParamCostCenter>(
    `/paramCostCenters/${id}`,
  );

  return data;
};
