import { axiosMcrExisting } from '@/lib/axios';
import { FAILED_UPDATE_DATA } from '@/lib/constant';
import { IBaseResponseApi } from '@/lib/types';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

function decodeHtmlEntities(html: string) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export const getParamPengumuman = async () => {
  try {
    const { data } = await axiosMcrExisting.get<
      IBaseResponseApi & { result: { id: number; isi: string }[] }
    >('/Pengumunan');

    return decodeHtmlEntities(decodeURIComponent(data?.result?.[0]?.isi));
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.message ?? 'Failed Get Data');
      throw new Error(error.message ?? 'Failed Get Data');
    }
    toast.error('Failed Get Data');

    throw new Error('Failed Get Data');
  }
};

export const updateParameterPengumuman = async ({ payload }: { payload: { text: string } }) => {
  try {
    await axiosMcrExisting.put<IBaseResponseApi>('/Pengumunan', {
      ID: '1',
      Isi: payload.text,
    });

    toast.success('Success Update Pengumuman!');

    return decodeHtmlEntities(decodeURIComponent(payload.text));
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data?.ResponseMessage || FAILED_UPDATE_DATA;
    }
    throw FAILED_UPDATE_DATA;
  }
};
