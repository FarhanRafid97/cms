import { axiosApiMassDebetV2 } from '@/lib/axios';
import { mappingLevelUser } from '@/lib/utils';
import { RequestBodyDashboard, ResponseGetDashboard } from '@/schema/dashboard';
import { AxiosResponse } from 'axios';
import { Session } from 'next-auth';

export const getDashboardMassDebet = async ({
  request,
  session,
}: {
  request: RequestBodyDashboard;
  session: Session | null;
}) => {
  const levelUser = mappingLevelUser(session?.user.LevelUser || '');
  request.role = levelUser ? levelUser.toLowerCase() : 'maker';
  request.personalNumber = Number(session?.user.PersonalNumber) || 0;

  if (session?.user.IsProductOwner) {
    request.costCenter = '';
  } else {
    request.costCenter = session?.user.CostCenter || '';
  }

  const { data } = await axiosApiMassDebetV2.post<
    ResponseGetDashboard,
    AxiosResponse<ResponseGetDashboard, RequestBodyDashboard>,
    RequestBodyDashboard
  >('/dashboard', request);

  return data;
};
