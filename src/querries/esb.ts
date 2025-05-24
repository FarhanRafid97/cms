import { FAILED_GET_DATA, MESSAGE_NOT_FOUND } from '@/lib/constant';
import { ApiRequestInquiryAccount } from '@/schema/esb';
import { getAccountESB } from '@/service/esb';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useGetAccountESB = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: ApiRequestInquiryAccount }) => {
      try {
        const response = await getAccountESB({ payload });
        if (response.response.responseCode === '00') {
          toast.success('Suksess Inquiry Nomor Rekening');
          return response;
        }

        toast.info(response.response.responseMessage);
        return null;
      } catch (error) {
        let errorMessage = FAILED_GET_DATA;

        if (error instanceof AxiosError && !!error?.response?.data?.response?.responseMessage) {
          errorMessage = `${error.response?.data?.response?.responseMessage}`.includes(
            'Unknown Account Type',
          )
            ? `Rekening ${MESSAGE_NOT_FOUND}`
            : error.response?.data.response?.responseMessage;
        }

        toast.error(`${errorMessage}`);
        return null;
      }
    },
  });
};
