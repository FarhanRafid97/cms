import { cn } from '@/lib/utils';
import { useMeasure } from '@uidotdev/usehooks';
import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import TextWrapedBorder from '../common/text-wrapped';
import { Button } from '../ui/button';
import LayoutNavbar from './layout-navbar';
const ListNavbar = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/Blog',
    label: 'Blog',
  },
];

export const Navbar = () => {
  const [ref, { height }] = useMeasure();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <LayoutNavbar className="sticky top-0 z-50 bg-background-new/95 md:py-0">
      <div ref={ref} className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <motion.div
              initial={{
                scale: 0.85,
                rotate: -3,
              }}
              whileHover={{
                scale: 0.9,
                rotate: 0,
              }}
            >
              <TextWrapedBorder variant="sky" className="px-0.5 h-auto !py-1">
                <span className="text-xl font-bold text-primary">Cagak.id</span>
              </TextWrapedBorder>
            </motion.div>
          </Link>
        </div>
        {/* Navigation Menu - Centered */}
        <div className=" items-center gap-2 hidden md:flex">
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                variant="ghost"
                className={`text-lg transition-colors relative hover:bg-black-shadow/10 ${
                  isActive('/')
                    ? 'text-primary font-semibold'
                    : 'text-black-shadow hover:text-primary'
                }`}
              >
                Home
                {isActive('/') && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Button>
            </motion.div>
          </Link>
          <Link href="/Blog">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Button
                variant="ghost"
                className={`text-lg transition-colors relative hover:bg-black-shadow/10   ${
                  isActive('/Blog')
                    ? 'text-primary font-semibold'
                    : 'text-black-shadow hover:text-primary'
                }`}
              >
                Blog
                {isActive('/Blog') && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Button>
            </motion.div>
          </Link>
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
        </div>{' '}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, type: 'spring', bounce: 0.1 }}
              className="md:hidden absolute  left-0 w-full bg-background-new/95 backdrop-blur-sm nice-box-shadow"
              style={{ top: `${(height || 0) + 30}px` }}
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
                            'text-primary/70 hover:bg-primary/5 hover:text-primary',
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
