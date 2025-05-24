import { useMemo } from 'react';
import { useRouter } from 'next/router';

export const useGetDynamicUrl = (): { pathname: string } => {
  const { pathname, query } = useRouter();

  const completePath = useMemo(() => {
    const pathSegments = pathname.split('/');

    return pathSegments
      .map((segment) => {
        if (segment.startsWith('[') && segment.endsWith(']')) {
          const key = segment.slice(1, -1);
          return (query[key] as string) || segment;
        }
        return segment;
      })
      .join('/');
  }, [pathname, query]);

  return {
    pathname: completePath,
  };
};
