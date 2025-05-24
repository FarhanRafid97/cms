import { axiosMcrExisting } from '@/lib/axios';
import { IBaseResponseApi } from '@/lib/types';
import { ResponseGetSeiDivision, SeiDivision } from '@/schema/parameter/seiDivision';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
const endpoint = '/ParamSEIDivision';

export const getListSeiDivision = async () => {
  try {
    const { data } = await axiosMcrExisting.get<ResponseGetSeiDivision>(endpoint);

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

export const editSeiDivision = async ({ payload }: { payload: SeiDivision }) => {
  const { data } = await axiosMcrExisting.put<IBaseResponseApi>(endpoint, payload);

  return data;
};
