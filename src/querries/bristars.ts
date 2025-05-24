import { getUserBristarsByPn } from '@/service/bristars';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

export const useGetUserBristarsByPn = () => {
  return useMutation({
    mutationFn: async ({ pn }: { pn: string }) => {
      try {
        const response = await getUserBristarsByPn({ pn });
        toast.success('Success get user bristars');
        return response;
      } catch (error) {
        let errorMsg = 'Failed Inquiry PN';

        if (error instanceof AxiosError) {
          if (error.response?.data.responseStatus === 'Error') {
            if (typeof error?.response?.data.responseData === 'string') {
              errorMsg = error?.response?.data.responseData;
            }
          }
        }
        toast.error(errorMsg);
        throw 'error get data bristars';
      }
    },
  });
};
