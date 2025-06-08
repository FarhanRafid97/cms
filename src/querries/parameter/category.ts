import { Category, CreateCategory, UpdateCategory } from '@/schema/paramter/category';
import { createNewCategory, getListCategory, updateCategory } from '@/service/parameter/category';
import { AdditionalData } from '@/types/globals';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const UNIQUE_KEY = 'category';

export const useGetListCategory = () => {
  return useQuery({
    queryKey: [UNIQUE_KEY],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes.
    retry: false,
    queryFn: async () => getListCategory(),
  });
};

export const useCreateNewCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateCategory) => {
      const response = await createNewCategory(payload);
      if (!response) {
        return null;
      }
      return response;
    },
    onSuccess: (response) => {
      const CURRENT_QUERRY = [UNIQUE_KEY];

      const previousData = queryClient.getQueryData(CURRENT_QUERRY) as Category[];

      if (!response) {
        return;
      }

      const newData: Category & AdditionalData = {
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

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdateCategory) => {
      const response = await updateCategory(payload);
      if (!response) {
        toast.error('Tipe post gagal diubah');
        return { payload: null };
      }
      toast.success('Tipe post berhasil diubah');
      return { payload };
    },
    onSuccess: ({ payload }) => {
      const CURRENT_QUERRY = [UNIQUE_KEY];
      const previousData = queryClient.getQueryData(CURRENT_QUERRY) as Category[];
      if (!payload) {
        return;
      }

      const updatedData = previousData.map((item) => {
        if (item.id === payload.id) {
          const newData: Category & AdditionalData = {
            ...item,
            description: payload.description || null,
            name: payload.name || '',
            color: payload.color || '',
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
