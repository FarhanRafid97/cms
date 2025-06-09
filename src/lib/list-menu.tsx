import { Rss, Settings2, Users } from 'lucide-react';
import { ReactNode } from 'react';
const ICON_SIZE = 16;

export const listMenu: {
  groupMenu: 'Parameter' | 'Post' | 'Users';
  icon: ReactNode;
  menus: { title: string; href: string }[];
}[] = [
  {
    groupMenu: 'Parameter',
    icon: <Settings2 size={ICON_SIZE} />,
    menus: [
      {
        title: 'Kategori',
        href: '/dashboard/category',
      },
      {
        title: 'Tag',
        href: '/dashboard/tags',
      },
      {
        title: 'Tipe Post',
        href: '/dashboard/post-type',
      },
    ],
  },
  {
    groupMenu: 'Users',
    icon: <Users size={ICON_SIZE} />,
    menus: [
      {
        title: 'User',
        href: '/dashboard/user',
      },
      {
        title: 'Role',
        href: '/dashboard/role',
      },
    ],
  },
  {
    groupMenu: 'Post',
    icon: <Rss size={ICON_SIZE} />,
    menus: [
      {
        title: 'Artikel',
        href: '/dashboard/posts/artikel',
      },
      {
        title: 'Cerita',
        href: '/dashboard/posts/cerita',
      },
      {
        title: 'Berita',
        href: '/dashboard/posts/berita',
      },
    ],
  },
];
