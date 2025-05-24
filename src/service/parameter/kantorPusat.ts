import { axiosApiNext, axiosMcrExisting } from '@/lib/axios';
import {
  FAILED_DELETE_DATA,
  FAILED_INSERT_DATA,
  FAILED_UPDATE_DATA,
  MESSAGE_SUCCESS_DELETE_DATA,
  MESSAGE_SUCCESS_INSERT_DATA,
  MESSAGE_SUCCESS_UPDATE_DATA,
} from '@/lib/constant';
import { IBaseResponseApi } from '@/lib/types';
import {
  TInsertKantorPusat,
  TKantorPusat,
  TResponseGetKantorPusat,
} from '@/schema/parameter/kantorPusat';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const ENDPOINT = `/parameter/kantor_pusat`;

export const getListKantorPusat = async () => {
  try {
    const { data } = await axiosMcrExisting.get(`/GetParamKantorPusat`);

    const dataResponse = data as TResponseGetKantorPusat;

    return dataResponse.Data;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.message ?? 'Failed Get Data');
    } else {
      toast.error('Failed Get Data');
    }
    return [];
  }
};

export const createKantorPusat = async ({ payload }: { payload: TInsertKantorPusat }) => {
  try {
    const { data } = await axiosApiNext.post<IBaseResponseApi>(ENDPOINT, payload);
    if (data.isSuccess) {
      toast.success(MESSAGE_SUCCESS_INSERT_DATA);
    }

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.ResponseMessage || FAILED_INSERT_DATA;
    }
    throw FAILED_INSERT_DATA;
  }
};

export const updateKantorPusat = async ({ payload }: { payload: TKantorPusat }) => {
  try {
    const { data } = await axiosApiNext.put<IBaseResponseApi>(ENDPOINT, payload);
    if (data.isSuccess) {
      toast.success(MESSAGE_SUCCESS_UPDATE_DATA);
    }

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.ResponseMessage || FAILED_UPDATE_DATA;
    }
    throw FAILED_UPDATE_DATA;
  }
};

export const deleteKantorPusat = async ({ payload }: { payload: TKantorPusat }) => {
  try {
    const { data } = await axiosApiNext.delete<IBaseResponseApi>(ENDPOINT, {
      data: { ID: payload.ID },
    });
    if (data.isSuccess) {
      toast.success(MESSAGE_SUCCESS_DELETE_DATA);
    }

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.ResponseMessage || FAILED_DELETE_DATA;
    }
    throw FAILED_DELETE_DATA;
  }
};
