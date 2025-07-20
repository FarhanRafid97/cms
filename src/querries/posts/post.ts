import { useGetFilterSearchparams } from '@/hooks/useGetSearchParams';
import {
  CompleteDetailPost,
  CompletePost,
  CreatePost,
  PostDetail,
  UpdatePost,
} from '@/schema/posts/post';
import {
  createNewPost,
  getListCompletePosts,
  getPostDetail,
  updatePost,
  updatePostDetail,
} from '@/service/posts/posts';
import { AdditionalData } from '@/types/globals';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const UNIQUE_KEY = 'post';

export const useGetCompletePosts = ({
  offsetFrom,
  offsetTo,
  post_type,
  author_id,
}: {
  post_type: string;
  offsetFrom: number;
  offsetTo: number;
  author_id: string;
}) => {
  return useQuery({
    queryKey: [UNIQUE_KEY, offsetFrom + '', offsetTo + '', post_type, author_id],
    refetchOnWindowFocus: false,
    enabled: !!post_type && !!author_id,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes.
    retry: false,
    queryFn: async () => {
      const result = await getListCompletePosts({ offsetFrom, offsetTo, post_type, author_id });
      return {
        data: result,
        totalData: result.length,
      };
    },
  });
};

export const useCreateNewPost = () => {
  const { search } = useGetFilterSearchparams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload }: { payload: CreatePost }) => {
      try {
        const response = await createNewPost({ dataPost: payload });

        if (!response) {
          toast.error('Gagal menambahkan artikel baru');
          return { payload: null, response: null };
        }
        toast.success('Sukses menambahkan artikel baru');
        return { payload, response };
      } catch (error) {
        return { payload: null, response: null };
      }
    },
    onSuccess: ({ response, payload }) => {
      const CURRENT_QUERRY = [
        UNIQUE_KEY,
        search._offsetFrom,
        search._offsetTo,
        payload?.post_type_id || 1,
        payload?.author_id || '',
      ];

      const { data: previousData, totalData } = queryClient.getQueryData(CURRENT_QUERRY) as {
        data: CompletePost[];
        totalData: number;
      };

      if (!response) {
        return;
      }

      const newData: CompletePost & AdditionalData = {
        id: response.id,
        is_featured: response.is_featured,
        author_id: response.author_id,
        avatar_url: response.authors.avatar_url,
        first_name: response.authors.first_name,
        last_name: response.authors.last_name,
        username: response.authors.username,
        category_color: response.categories?.color || '',
        category_id: response.categories?.id || '',
        category_name: response.categories?.name || '',
        category_slug: response.categories?.slug || '',
        created_at: response.created_at,
        excerpt: response.excerpt,
        featured_image_url: response.featured_image_url,
        meta_description: response.meta_description,
        meta_title: response.id,
        published_at: response.published_at,
        reading_time: response.reading_time,
        slug: response.slug,
        status: response.status,
        title: response.title,
        updated_at: response.updated_at,
        view_count: 0,
        isNew: true,
        post_type: response.post_type?.name || null,
        post_type_id: response.post_type?.id || null,
      };

      queryClient.setQueryData(CURRENT_QUERRY, {
        data: [newData, ...previousData],
        totalData: totalData + 1,
      });
      return newData;
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ payload, postId }: { payload: UpdatePost; postId: string }) => {
      const result = await updatePost({ payload, postId });
      return { payload, postId, result };
    },
    onSuccess: ({ payload, postId }) => {
      if (payload) {
        toast.success('Sukses mengubah artikel', {
          description: `Artikel ${payload.title} berhasil diubah `,
        });
        const CURRENT_QUERRY = [UNIQUE_KEY, 'detail', postId];
        const previousData = queryClient.getQueryData(CURRENT_QUERRY) as CompleteDetailPost;
        console.log('previousData', previousData);
        if (!previousData) {
          return;
        }

        const updatedData = {
          ...previousData,
          ...payload,
        };
        queryClient.setQueryData(CURRENT_QUERRY, updatedData);
      }
    },
  });
};

export const useGetPostDetail = ({ postId }: { postId: string }) => {
  return useQuery({
    queryKey: [UNIQUE_KEY, 'detail', postId],
    enabled: !!postId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes.
    retry: false,
    queryFn: async () => {
      if (!postId) {
        return null;
      }
      const result = await getPostDetail({ postId });
      return result;
    },
  });
};

export const useUpdatePostDetail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      payload,
    }: {
      payload: { postId: string; content: string; detail_post_id: string };
    }) => {
      const result = await updatePostDetail({ payload });
      if (result) {
        return { payload, result };
      }
      return { payload: null, result: null };
    },
    onSuccess: ({ payload }) => {
      if (payload) {
        toast.success('Sukses mengubah artikel');
        const CURRENT_QUERRY = [UNIQUE_KEY, 'detail', payload.postId];
        queryClient.setQueryData(CURRENT_QUERRY, (oldData: PostDetail | null) => {
          if (!oldData) {
            return null;
          }
          return {
            ...oldData,
            content: payload.content,
          };
        });
      }
    },
  });
};
