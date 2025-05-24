import { SESSION_EXPIRED_TIME } from '@/lib/constant';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/router';

import { useEffect, useRef } from 'react';

export const useDetectUserAFK = () => {
  const ref = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  useEffect(() => {
    const startIdleTimer = () => {
      ref.current = setTimeout(() => {
        supabase.auth.signOut();
        router.push('/login');
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
