import { getBatchId } from '@/service/getBatchId';
import { useQuery } from '@tanstack/react-query';

export const useGetBatchId = () => {
  return useQuery({
    queryKey: ['get_batch_id'],

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
    queryFn: () => getBatchId({}),
  });
};
