import { RequestBodyDashboard } from '@/schema/dashboard';
import { getDashboardMassDebet } from '@/service/massDebet/dashboard';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';

const KEY_DASHBIARD_MASS_DEBET = 'KEY_DASHBIARD_MASS_DEBET';
export const useGetDashboardMassDebet = ({
  request,
  session,
}: {
  request: RequestBodyDashboard;
  session: Session | null;
}) => {
  return useQuery({
    queryKey: [KEY_DASHBIARD_MASS_DEBET, request.year, request.month],
    enabled: session != null,
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => getDashboardMassDebet({ request, session }),
  });
};
