import { axiosApiNext } from '@/lib/axios';
import { TResponseGetMenu } from '@/lib/types';
import { mappingMenuList } from '@/lib/utils';
import { TMenu } from '@/schema/menu';
import { AxiosError } from 'axios';

export const getListMenu = async ({ payload }: { payload: TMenu }) => {
  try {
    const { data } = await axiosApiNext.post<TResponseGetMenu>('/menu', payload);

    if (data.isSuccess) {
      return mappingMenuList({ menuData: data.result });
    }
    return [];
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    return [];
  }
};
