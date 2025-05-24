import { axiosApiMCRGLCasa } from '@/lib/axios';
import { ResponseGetParamJenisFee } from '@/schema/MassDebet/pengajuan';

export const getParamJenisFee = async () => {
  const { data } = await axiosApiMCRGLCasa.get<ResponseGetParamJenisFee>('/paramFeeTypes');

  return data.data;
};
