import { axiosApiMCRGLCasa } from '@/lib/axios';

import {
  CreateGLProtectRequestType,
  ResponseCreateGLProtect,
  ResponseGetGLProtect,
  UpdateGLProtectRequestType,
} from '@/schema/parameter/gl-protect-schema';
import { AxiosResponse } from 'axios';

export const createParamGlProtect = async ({
  payload,
}: {
  payload: CreateGLProtectRequestType;
}) => {
  const { data } = await axiosApiMCRGLCasa.post<
    ResponseCreateGLProtect,
    AxiosResponse<ResponseCreateGLProtect, CreateGLProtectRequestType>,
    CreateGLProtectRequestType
  >('/paramGLProtects', payload);
  return data;
};

export const getListParamGLProtect = async () => {
  const { data } = await axiosApiMCRGLCasa.get<ResponseGetGLProtect>('/paramGLProtects');

  return data;
};

export const updateParamGLProtect = async ({
  payload,
}: {
  payload: UpdateGLProtectRequestType;
}) => {
  const { data } = await axiosApiMCRGLCasa.put<
    ResponseGetGLProtect,
    AxiosResponse<ResponseCreateGLProtect, UpdateGLProtectRequestType>,
    UpdateGLProtectRequestType
  >(`/paramGLProtects/${payload.ID}`, payload);

  return data;
};
export const deleteParamGLProtect = async ({ id }: { id: string }) => {
  const { data } = await axiosApiMCRGLCasa.delete<ResponseCreateGLProtect>(
    `/paramGLProtects/${id}`,
  );

  return data;
};
