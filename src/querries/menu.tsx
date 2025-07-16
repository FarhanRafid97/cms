import { getListPostType } from '@/service/parameter/post-type';
import { useQuery } from '@tanstack/react-query';
import { Rss } from 'lucide-react';
import { listMenu } from '@/lib/list-menu';
import { ReactNode } from 'react';

const useGetListMenu = () => {
  return useQuery({
    queryKey: ['menu'],
    queryFn: async (): Promise<
      {
        groupMenu: 'Parameter' | 'Post' | 'Users';
        icon: ReactNode;
        menus: { title: string; href: string }[];
      }[]
    > => {
      const data = await getListPostType();

      // Build the Post menu dynamically from postType list
      const postMenus =
        data?.map((postType) => ({
          title: postType.name ?? '',
          href: `/dashboard/post/${postType.name ?? ''}`,
        })) || [];

      return [
        ...listMenu,
        {
          groupMenu: 'Post',
          icon: <Rss size={16} />,
          menus: postMenus,
        },
      ];
    },
  });
};

export default useGetListMenu;
