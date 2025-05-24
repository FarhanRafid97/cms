import { axiosMcrExisting } from '@/lib/axios';
import { IBaseResponseApi } from '@/lib/types';
import {
  TMaintenanceMenuMenu,
  TResponseGetMaintenanceMenuMenu,
} from '@/schema/MaintenanceMenu/menu';

const ENDPOINT = '/menu';
export const getListMenu = async () => {
  try {
    const { data } = await axiosMcrExisting.get<TResponseGetMaintenanceMenuMenu>(ENDPOINT);

    return data.result;
  } catch (error) {
    return [];
  }
};

export const editMaintenanceMenu = async ({ payload }: { payload: TMaintenanceMenuMenu }) => {
  const { data } = await axiosMcrExisting.put<IBaseResponseApi & { result: TMaintenanceMenuMenu }>(
    ENDPOINT,
    payload,
  );

  return data;
};
