import { useGetListPostType } from '@/querries/parameter/post-type';
import { PostType } from '@/schema/paramter/post-type';
import { useRouter } from 'next/router';

export const useGetPostTypeId = (): PostType => {
  const { data } = useGetListPostType();
  const { pathname } = useRouter();
  const lastPath = pathname.split('/').pop();
  const result = data?.filter((item) => item.name?.toLowerCase() === lastPath?.toLowerCase());
  console.log(result);
  if (!result) {
    return {
      id: 1,
      name: 'Artikel',
      description: 'Artikel',
      created_at: new Date().toISOString(),
    };
  }
  return result[0];
};
