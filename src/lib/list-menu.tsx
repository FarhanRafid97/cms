import { Rss, Settings2 } from 'lucide-react';
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
