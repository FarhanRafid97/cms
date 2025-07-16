import { useGetListPostType } from '@/querries/parameter/post-type';
import { PostType } from '@/schema/paramter/post-type';
import { useRouter } from 'next/router';

export const useGetPostTypeId = (): PostType => {
  const { data } = useGetListPostType();
  const router = useRouter();

  // Get the last path segment (slug) from asPath, which includes dynamic routes and query params
  let lastPath = '';
  if (router.asPath) {
    // Remove query string and hash
    const cleanPath = router.asPath.split(/[?#]/)[0];
    // Remove trailing slash if present
    const trimmedPath = cleanPath.replace(/\/$/, '');
    // Get last segment
    lastPath = trimmedPath.split('/').pop() || '';
  }

  console.log('lastPath (slug):', lastPath);

  const result = data?.filter((item) => item.name?.toLowerCase() === lastPath.toLowerCase());
  console.log(result);

  if (!result || result.length === 0) {
    return {
      id: 1,
      name: 'unknown',
      isNew: false,
      isUpdate: false,
    };
  }
  return result[0];
};
