import { RequestBodyDashboard } from '@/schema/dashboard';
import { getDashboardMassGL } from '@/service/massGL/dashboard';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';

const KEY_DASHBIARD_MASS_CREDIT = 'KEY_DASHBIARD_MASS_CREDIT';
export const useGetDashboardMassGL = ({
  request,
  session,
}: {
  request: RequestBodyDashboard;
  session: Session | null;
}) => {
  return useQuery({
    queryKey: [KEY_DASHBIARD_MASS_CREDIT, request.transactionType, request.month, request.year],
    enabled: !!session,
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getDashboardMassGL({ request, session }),
  });
};
