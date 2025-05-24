import { axiosMcrExisting } from '@/lib/axios';
import {
  TApplication,
  TResponseEditApplication,
  TResponseGetApplication,
} from '@/schema/parameter/application';

export const getListApplication = async () => {
  const { data } = await axiosMcrExisting.get<TResponseGetApplication>(`ParamApplication`);

  return data.result;
};

export const editApplication = async ({ payload }: { payload: TApplication }) => {
  const { data } = await axiosMcrExisting.put<TResponseEditApplication>(
    `ParamApplication`,
    payload,
  );

  return data;
};
