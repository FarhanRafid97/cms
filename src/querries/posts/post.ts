import { useGetFilterSearchparams } from '@/hooks/useGetSearchParams';
import { CompletePost, CreatePost } from '@/schema/posts/post';
import { createNewPost, getListCompletePosts } from '@/service/posts/posts';
import { AdditionalData } from '@/types/globals';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const UNIQUE_KEY = 'post';

export const useGetCompletePosts = ({
  offsetFrom,
  offsetTo,
}: {
  offsetFrom: number;
  offsetTo: number;
}) => {
  return useQuery({
    queryKey: [UNIQUE_KEY, offsetFrom + '', offsetTo + ''],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5, // 5 minutes.
    retry: false,
    queryFn: async () => {
      const result = await getListCompletePosts({ offsetFrom, offsetTo });
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

        if (response) {
          toast.success('Sukses menambahkan artikel baru');
          return { payload, response };
        }
        return { payload: null, response: null };
      } catch (error) {
        return { payload: null, response: null };
      }
    },
    onSuccess: ({ response }) => {
      const CURRENT_QUERRY = [UNIQUE_KEY, search._offsetFrom, search._offsetTo];
      console.log(CURRENT_QUERRY);
      const { data: previousData, totalData } = queryClient.getQueryData(CURRENT_QUERRY) as {
        data: CompletePost[];
        totalData: number;
      };
      console.log('previousData', previousData);
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
        content: '',
        content_type: '',
        created_at: response.created_at,
        excerpt: response.excerpt,
        featured_image_url: response.featured_image_url,
        meta_description: response.meta_description,
        meta_title: response.id,
        published_at: response.published_at,
        raw_content: '',
        reading_time: response.reading_time,
        slug: response.slug,
        status: response.status,
        title: response.title,
        updated_at: response.updated_at,
        view_count: 0,
        word_count: 0,
        isNew: true,
      };

      queryClient.setQueryData(CURRENT_QUERRY, {
        data: [newData, ...previousData],
        totalData: totalData + 1,
      });
      return newData;
    },
  });
};
