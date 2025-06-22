import LayoutNavbar from './layout-navbar';
import { cn } from '@/lib/utils';
import { useMeasure } from '@uidotdev/usehooks';
import { motion, AnimatePresence } from 'motion/react';
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
    path: '/Artikel',
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const [ref, { height }] = useMeasure();
  const getActivePath = useCallback(() => {
    const find = ListNavbar.find((d) => d.path === pathname);
    if (find) {
      setActiveTab(find);
    }
  }, [pathname]);

  useEffect(() => {
    getActivePath();
  }, [getActivePath]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <LayoutNavbar className="sticky top-0 z-50 bg-background-new/95 md:py-0">
      <div ref={ref} className="max-w-7xl  mx-auto px-4 grid grid-cols-5 relative">
        <div className="flex items-center gap-2 col-span-2">
          <Link href="/">
            <Image src="/main-logo.png" alt="Logo" width={60} height={60} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="items-center gap-2 col-span-3 hidden md:flex justify-end">
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
                  {activeTab.path === tab.path ? (
                    <motion.div
                      layoutId="tab"
                      className={cn(
                        'absolute inset-0 inline-block border-2 border-primary dark:bg-neutral-900 bg-background/80 px-2 py-2',
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
                      'relative font-[400] text-primary',
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

        {/* Mobile Hamburger Button */}
        <div className="items-center col-span-3 flex justify-end md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-background/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Toggle mobile menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? 'open' : 'closed'}
              className="flex flex-col justify-center items-center w-6 h-6 relative"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: -6 },
                  open: { rotate: 45, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-primary absolute"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1, y: 0 },
                  open: { opacity: 0, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-primary absolute"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 6 },
                  open: { rotate: -45, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                className="w-6 h-0.5 bg-primary absolute"
              />
            </motion.div>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, type: 'spring', bounce: 0.1 }}
              className="md:hidden absolute  left-0 w-full bg-background-new/95 backdrop-blur-sm nice-box-shadow"
              style={{ top: `${(height || 0) + 10}px` }}
            >
              <div className="max-w-7xl mx-auto px-4 py-4">
                <ul className="flex flex-col space-y-2">
                  {ListNavbar.map((tab, index) => (
                    <motion.li
                      key={tab.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.2,
                        type: 'spring',
                        bounce: 0.1,
                      }}
                    >
                      <Link href={tab.path} onClick={handleMobileMenuClick}>
                        <div
                          className={cn(
                            'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                            activeTab.path === tab.path
                              ? 'bg-primary/10 text-primary border border-primary/20'
                              : 'text-primary/70 hover:bg-primary/5 hover:text-primary',
                          )}
                        >
                          {tab.label}
                        </div>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutNavbar>
  );
};
