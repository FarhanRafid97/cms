import { SESSION_EXPIRED_TIME } from '@/lib/constant';
import { signOut } from 'next-auth/react';
import { useEffect, useRef } from 'react';

export const useDetectUserAFK = () => {
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const startIdleTimer = () => {
      ref.current = setTimeout(() => {
        signOut();
      }, SESSION_EXPIRED_TIME);
    };

    const resetIdleTimer = () => {
      if (ref.current) {
        clearTimeout(ref.current);
      }
      startIdleTimer();
    };

    startIdleTimer();

    const handleMouseActivity = () => resetIdleTimer();
    const handleKeyboardActivity = () => resetIdleTimer();

    document.addEventListener('mousemove', handleMouseActivity);
    document.addEventListener('keydown', handleKeyboardActivity);

    return () => {
      // Cleanup event listeners when the component unmounts
      document.removeEventListener('mousemove', handleMouseActivity);
      document.removeEventListener('keydown', handleKeyboardActivity);
    };
  }, []);
};
