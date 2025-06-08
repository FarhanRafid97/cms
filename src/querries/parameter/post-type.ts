import { CreatePostType, PostType, UpdatePostType } from '@/schema/paramter/post-type';
import { createNewPostType, getListPostType, updatePostType } from '@/service/parameter/post-type';
import { AdditionalData } from '@/types/globals';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const UNIQUE_KEY = 'post-type';

export const useGetListPostType = () => {
  return useQuery({
    queryKey: [UNIQUE_KEY],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes.
    retry: false,
    queryFn: async () => getListPostType(),
  });
};

export const useCreateNewPostType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreatePostType) => {
      const response = await createNewPostType(payload);
      if (!response) {
        return null;
      }
      return response;
    },
    onSuccess: (response) => {
      const CURRENT_QUERRY = [UNIQUE_KEY];

      const previousData = queryClient.getQueryData(CURRENT_QUERRY) as PostType[];

      if (!response) {
        return;
      }

      const newData: PostType & AdditionalData = {
        id: response.id,
        name: response.name,
        description: response.description,
        created_at: response.created_at,
        isNew: true,
      };

      toast.success('Tipe post berhasil ditambahkan');
      queryClient.setQueryData(CURRENT_QUERRY, [newData, ...previousData]);
    },
    onError: () => {
      toast.error('Tipe post gagal ditambahkan');
    },
  });
};

export const useUpdatePostType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdatePostType) => {
      const response = await updatePostType(payload);
      if (!response) {
        toast.error('Tipe post gagal diubah');
        return { payload: null };
      }
      toast.success('Tipe post berhasil diubah');
      return { payload };
    },
    onSuccess: ({ payload }) => {
      const CURRENT_QUERRY = [UNIQUE_KEY];
      const previousData = queryClient.getQueryData(CURRENT_QUERRY) as PostType[];
      if (!payload) {
        return;
      }

      const updatedData = previousData.map((item) => {
        if (item.id === payload.id) {
          const newData: PostType & AdditionalData = {
            ...item,
            description: payload.description || null,
            name: payload.name,
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
