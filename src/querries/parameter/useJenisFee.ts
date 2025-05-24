import { getParamJenisFee } from '@/service/parameter/jenisFee';
import { useQuery } from '@tanstack/react-query';

export const useGetParamJenisFee = () => {
  return useQuery({
    queryKey: ['param_jenis_fee'],
    staleTime: 5000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: () => getParamJenisFee(),
  });
};
