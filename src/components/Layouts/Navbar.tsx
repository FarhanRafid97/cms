import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
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
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full md:w-3/4 rounded-2xl bg-gray-400/5 backdrop-blur-sm sticky top-0 z-50 border border-[#dbdbdbd]"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-5">
        <div className="flex items-center gap-2 col-span-1">
          <Link href="/">
            <Image src="/book-logo.png" alt="Logo" width={30} height={30} />
          </Link>
        </div>
        <div className=" items-center gap-2 col-span-3 flex justify-center ">
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
                  onMouseLeave={() => setActiveTab(tab)}
                >
                  {activeTab.path === tab.path ? (
                    <motion.div
                      layoutId="tab"
                      className="absolute inset-0 rounded-lg bg-black/10"
                      transition={{
                        duration: 0.3,
                        type: 'spring',
                        bounce: 0.1,
                      }}
                    />
                  ) : null}
                  <span className="relative text-inherit">{tab.label}</span>
                </motion.li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};
