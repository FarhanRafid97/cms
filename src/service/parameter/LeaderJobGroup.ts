import { axiosMcrExisting } from '@/lib/axios';
import { IBaseResponseApi } from '@/lib/types';
import {
  TInsertLeaderJobGroup,
  TLeaderJobGroup,
  TResponseGetLeaderJobGroup,
} from '@/schema/parameter/LeaderJobGroup';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const endpoint = `/ParamLeaderJobGroup`;

export const getListLeaderJobGroup = async () => {
  try {
    const { data } = await axiosMcrExisting.get(endpoint);

    const dataResponse = data as TResponseGetLeaderJobGroup;

    return dataResponse.result;
  } catch (error) {
    const err = error as AxiosError;

    toast.error(err.message ?? 'Failed Get Data');
    return [];
  }
};

export const addParamLeaderJobGroup = async ({ payload }: { payload: TInsertLeaderJobGroup }) => {
  const { data } = await axiosMcrExisting.post<IBaseResponseApi & { result: TLeaderJobGroup }>(
    endpoint,
    payload,
  );

  return data;
};

export const updateParamLeaderJobGroup = async ({ payload }: { payload: TLeaderJobGroup }) => {
  const { data } = await axiosMcrExisting.put<IBaseResponseApi>(endpoint, payload);

  return data;
};
export const deleteParamLeaderJobGroup = async ({ payload }: { payload: TLeaderJobGroup }) => {
  const { data } = await axiosMcrExisting.delete<IBaseResponseApi>(
    `/ParamLeaderJobGroup/${payload.id}`,
    {
      data: { id: payload.id },
    },
  );

  return data;
};
