import { RequestBodyDashboard } from '@/schema/dashboard';
import { getDashboardMassCredit } from '@/service/massCredit/dashboard';
import { useQuery } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { toast } from 'sonner';

const KEY_DASHBIARD_MASS_CREDIT = 'KEY_DASHBIARD_MASS_CREDIT';
export const useGetDashboardMassCredit = ({
  request,
  session,
}: {
  request: RequestBodyDashboard;
  session: Session | null;
}) => {
  return useQuery({
    queryKey: [KEY_DASHBIARD_MASS_CREDIT, request.year, request.month],
    enabled: session != null,
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: async () => {
      try {
        const response = await getDashboardMassCredit({ request, session });
        if (response.status === '00') {
          return response;
        }
        toast.info(response.message);
        return null;
      } catch (error) {
        return null;
      }
    },
  });
};
