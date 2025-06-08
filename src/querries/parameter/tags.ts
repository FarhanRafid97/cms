import { CreateTag, Tag } from '@/schema/paramter/tag';
import { createNewTag, getListTags } from '@/service/parameter/tag';
import { AdditionalData } from '@/types/globals';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const UNIQUE_KEY = 'tags';

export const useGetListTag = () => {
  return useQuery({
    queryKey: [UNIQUE_KEY],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes.
    retry: false,
    queryFn: async () => getListTags(),
  });
};

export const useCreateNewTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateTag) => {
      const response = await createNewTag(payload);
      if (!response) {
        return null;
      }
      return response;
    },
    onSuccess: (response) => {
      const CURRENT_QUERRY = [UNIQUE_KEY];

      const previousData = queryClient.getQueryData(CURRENT_QUERRY) as Tag[];

      if (!response) {
        return;
      }

      const newData: Tag & AdditionalData = {
        ...response,
        isNew: true,
      };

      toast.success('Kategori berhasil ditambahkan');
      queryClient.setQueryData(CURRENT_QUERRY, [newData, ...previousData]);
    },
    onError: () => {
      toast.error('Kategori gagal ditambahkan');
    },
  });
};
