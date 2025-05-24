import { axiosApiNext } from '@/lib/axios';
import { GetUserBristarsResponse } from '@/schema/bristarts';

const ENPOINT = '/bristars/get_user_bristars';

export const getUserBristarsByPn = async ({ pn }: { pn: string }) => {
  const { data } = await axiosApiNext.post<GetUserBristarsResponse>(ENPOINT, {
    pernr: pn,
  });

  return data;
};
