import { axiosMcrExisting } from '@/lib/axios';
import { IBaseResponseApi } from '@/lib/types';
import { TGroupMenu, TResponseGetGroupMenu } from '@/schema/MaintenanceMenu/GroupMenu';

const ENDPOINT = '/GroupMenu';
export const getListGroupMenu = async () => {
  try {
    const { data } = await axiosMcrExisting.get<TResponseGetGroupMenu>(ENDPOINT);

    return data.result;
  } catch (error) {
    return [];
  }
};

export const editGroupMenu = async ({ payload }: { payload: TGroupMenu }) => {
  const { data } = await axiosMcrExisting.put<IBaseResponseApi>(ENDPOINT, payload);

  return data;
};
