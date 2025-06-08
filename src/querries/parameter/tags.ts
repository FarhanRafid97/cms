import { CreateTag, Tag, UpdateTag } from '@/schema/paramter/tag';
import { createNewTag, deleteTag, getListTags, updateTag } from '@/service/parameter/tag';
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

export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateTag) => {
      const response = await updateTag(payload);
      if (!response) {
        toast.error('Tipe post gagal diubah');
        return { payload: null };
      }
      toast.success('Tipe post berhasil diubah');
      return { payload };
    },
    onSuccess: ({ payload }) => {
      const CURRENT_QUERRY = [UNIQUE_KEY];
      const previousData = queryClient.getQueryData(CURRENT_QUERRY) as Tag[];
      if (!payload) {
        return;
      }

      const updatedData = previousData.map((item) => {
        if (item.id === payload.id) {
          const newData: Tag & AdditionalData = {
            ...item,
            name: payload.name || '',
            slug: payload.slug || '',
            isUpdate: true,
          };
          return newData;
        }
        return item;
      });
      queryClient.setQueryData(CURRENT_QUERRY, updatedData);
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteTag(id);
      if (!response) {
        return { payload: null };
      }
      toast.success('Kategori berhasil dihapus');
      return { payload: id };
    },
    onSuccess: ({ payload }) => {
      const CURRENT_QUERRY = [UNIQUE_KEY];
      const previousData = queryClient.getQueryData(CURRENT_QUERRY) as Tag[];
      if (!payload) {
        return;
      }

      const updatedData = previousData.map((item) => {
        if (item.id === payload) {
          const newData: Tag & AdditionalData = {
            ...item,
            isError: true,
          };
          return newData;
        }
        return item;
      });
      queryClient.setQueryData(CURRENT_QUERRY, updatedData);
    },
    onError: () => {
      toast.error('Kategori gagal dihapus');
    },
  });
};
