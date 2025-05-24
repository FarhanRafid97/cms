import { axiosApiNext } from '@/lib/axios';
import { ApiRequestInquiryAccount, ResponseInquiryAccount } from '@/schema/esb';

export const getAccountESB = async ({ payload }: { payload: ApiRequestInquiryAccount }) => {
  const { data } = await axiosApiNext.post<ResponseInquiryAccount>(
    '/esb/inquiry_nomor_rekening',
    payload,
  );

  return data;
};
