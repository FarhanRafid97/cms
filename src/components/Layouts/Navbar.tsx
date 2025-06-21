import LayoutNavbar from './layout-navbar';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
const ListNavbar = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/artikel',
    label: 'Artikel',
  },
  {
    path: '/Cerita',
    label: 'Cerita',
  },
  {
    path: '/Berita',
    label: 'Berita',
  },
];

const defaulCssBorder =
  'pointer-events-none rounded-full  group-hover/cover:opacity-100 group h-2 w-2 border-primary border-2 bg-background dark:bg-white  group-hover/cover:bg-white absolute';

export const Navbar = () => {
  const [activeTab, setActiveTab] = useState({ path: '', label: '' });
  const router = useRouter();
  const { pathname } = router;

  const getActivePath = useCallback(() => {
    const find = ListNavbar.find((d) => d.path === pathname);
    if (find) {
      setActiveTab(find);
    }
  }, [pathname]);

  useEffect(() => {
    getActivePath();
  }, [getActivePath]);

  return (
    <LayoutNavbar className="  sticky top-0 z-50 bg-background-new/95 md:py-0">
      <div className="max-w-7xl mx-auto px-4  grid grid-cols-5">
        <div className="flex items-center gap-2 col-span-2">
          <Link href="/">
            <Image src="/main-logo.png" alt="Logo" width={70} height={70} />
          </Link>
        </div>
        <div className=" items-center gap-2 col-span-3 flex justify-end ">
          <ul className="flex gap-2">
            {ListNavbar.map((tab) => (
              <Link key={tab.path} href={tab.path}>
                <motion.li
                  layout
                  className={cn(
                    'relative cursor-pointer px-2 py-1 text-sm outline-none transition-colors',
                    activeTab === tab ? 'text-gray-800' : 'text-gray-700',
                  )}
                  tabIndex={0}
                  key={tab.path}
                  onFocus={() => setActiveTab(tab)}
                  onMouseOver={() => setActiveTab(tab)}
                >
                  {' '}
                  {activeTab.path === tab.path ? (
                    <motion.div
                      layoutId="tab"
                      className={cn(
                        '  absolute inset-0  inline-block border-2 border-primary  dark:bg-neutral-900 bg-background/80 px-2 py-2  ',
                      )}
                      transition={{
                        duration: 0.3,
                        type: 'spring',
                        bounce: 0.1,
                      }}
                    >
                      <div className={cn(defaulCssBorder, '-right-[4px] -top-[4px]')}></div>
                      <div className={cn(defaulCssBorder, '-bottom-[4px] -right-[4px]')}></div>
                      <div className={cn(defaulCssBorder, '-left-[4px] -top-[4px]')}></div>
                      <div className={cn(defaulCssBorder, '-bottom-[4px] -left-[4px]')}></div>
                    </motion.div>
                  ) : null}
                  <span
                    className={cn(
                      'relative   font-[400] text-primary',
                      activeTab.path === tab.path ? 'text-primary' : 'text-primary/40',
                    )}
                  >
                    {tab.label}
                  </span>
                </motion.li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </LayoutNavbar>
  );
};
