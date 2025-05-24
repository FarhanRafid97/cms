import { Editor } from '@/components/tip-tap/main-editor';
import { Scan } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useClickAway } from '@uidotdev/usehooks';
export default function Page() {
  const [isActive, setIsActive] = useState<boolean>(false);

  const ref = useClickAway<HTMLDivElement>(() => {
    setIsActive(false);
  });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsActive(false);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div>
      <div className="w-full  py-4 flex justify-between px-8">
        tst
        <motion.button
          onClick={() => {
            setIsActive(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
          className="w-fit "
        >
          <Scan />
        </motion.button>
      </div>
      <AnimatePresence>
        {isActive ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999999] bg-black/40 cursor-none"
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {isActive ? (
          <>
            <div className=" fixed  p-6 inset-0 z-[99999999] flex justify-center items-center">
              <motion.div
                className="w-full h-full   bg-white"
                layoutId="card-tiptap"
                ref={ref}
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  transition: { duration: 0, ease: 'easeOut' },
                }}
                exit={{ opacity: 0, filter: 'blur(4px)' }}
                style={{ borderRadius: 12 }}
              >
                <Editor />;
              </motion.div>
            </div>
          </>
        ) : null}
      </AnimatePresence>
      <motion.div layoutId="card-tiptap">
        <Editor />;
      </motion.div>
    </div>
  );
}
