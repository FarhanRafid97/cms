import { Album, Settings2 } from 'lucide-react';
import { ReactNode } from 'react';
const ICON_SIZE = 16;
export const listMenu: {
  groupMenu: 'Parameter' | 'Post';
  icon: ReactNode;
  menus: { title: string; href: string }[];
}[] = [
  {
    groupMenu: 'Parameter',
    icon: <Settings2 size={ICON_SIZE} />,
    menus: [
      {
        title: 'Category',
        href: '/dashboard/category',
      },
      {
        title: 'Tag',

        href: '/dashboard/tags',
      },
    ],
  },
  {
    groupMenu: 'Post',
    icon: <Album size={ICON_SIZE} />,
    menus: [
      {
        title: 'Posts',
        href: '/dashboard/posts/list-post',
      },
    ],
  },
] as const;
