import { axiosMcrExisting } from '@/lib/axios';
import { IBaseResponseApi } from '@/lib/types';
import {
  TEdittLevelUserMenu,
  TInsertLevelUserMenu,
  TLevelUserMenu,
  TResponseGetLevelUserMenu,
} from '@/schema/Mapping/LevelUserMenu';
const ENDPOINT = '/MappingLevelUserMenu';

export const getListLevelUserMenu = async () => {
  try {
    const { data } = await axiosMcrExisting.get<TResponseGetLevelUserMenu>(ENDPOINT);

    return data.result;
  } catch (error) {
    return [];
  }
};

export const createLevelUserMenu = async ({ payload }: { payload: TInsertLevelUserMenu }) => {
  const { data } = await axiosMcrExisting.post<
    IBaseResponseApi & {
      result: {
        id: number;
        fidParamLevelUser: number;
        fidMenu: number;
      };
    }
  >(ENDPOINT, payload);

  return data;
};

export const editLevelUserMenu = async ({ payload }: { payload: TLevelUserMenu }) => {
  const { data } = await axiosMcrExisting.put<IBaseResponseApi>(ENDPOINT, {
    fidMenu: payload.fidMenu,
    fidParamLevelUser: payload.fidParamLevelUser,
    id: payload.id,
  } as TEdittLevelUserMenu);

  return data;
};

export const deleteLevelUserMenu = async ({ payload }: { payload: TLevelUserMenu }) => {
  const { data } = await axiosMcrExisting.delete<IBaseResponseApi>(`${ENDPOINT}/${payload.id}`, {
    data: { id: payload.id },
  });

  return data;
};
