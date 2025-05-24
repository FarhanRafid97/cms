import { axiosMcrExisting } from '@/lib/axios';
import { IBaseResponseApi } from '@/lib/types';
import { TProductOwner, TResponseGetPRoductOwner } from '@/schema/parameter/productOwner';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const endpoint = `/ParamProductOwner`;

export const getListProductOwner = async () => {
  try {
    const { data } = await axiosMcrExisting.get<TResponseGetPRoductOwner>(endpoint);

    return data.result;
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.message ?? 'Failed Get Data');
    } else {
      toast.error('Failed Get Data');
    }
    return [];
  }
};

export const editProductOwner = async ({ payload }: { payload: TProductOwner }) => {
  const { data } = await axiosMcrExisting.put<IBaseResponseApi>(endpoint, payload);

  return data;
};
