import { Album, Shield } from 'lucide-react';
import { ReactNode } from 'react';
const ICON_SIZE = 16;
export const listMenu: {
  groupMenu: string;
  icon: ReactNode;
  menus: { title: string; href: string }[];
}[] = [
  {
    groupMenu: 'Admin',
    icon: <Shield size={ICON_SIZE} />,
    menus: [
      {
        title: 'Dashboard',
        href: '/dashboard/Category',
      },
      {
        title: 'Category',
        href: '/dashboard/category',
      },
      {
        title: 'Tag',

        href: '/dashboard/tag',
      },
      {
        title: 'Logout',

        href: '/logout',
      },
    ],
  },
  {
    groupMenu: 'Post',
    icon: <Album size={ICON_SIZE} />,
    menus: [
      {
        title: 'Posts',
        href: '/dashboard/posts',
      },
    ],
  },
];
