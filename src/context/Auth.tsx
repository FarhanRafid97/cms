import { supabase } from '@/lib/supabase';
import { Author } from '@/schema/posts/post';
import { getMyself } from '@/service/auth';
import { Session } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: Author | null | undefined;
  session: Session | null;
  loading: boolean;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a ProvideAuth');
  }
  return context;
};

interface ProvideAuthProps {
  children: ReactNode;
}

export function ProvideAuth({ children }: ProvideAuthProps) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useProvideAuth(): AuthContextType {
  const [user, setUser] = useState<Author | null | undefined>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      if (user) {
        return;
      }

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log('session', !session);
        if (!session) {
          setUser(undefined);
          return;
        }

        const detailMySelf = await getMyself({ user_id: session?.user.id || '' });
        if (!detailMySelf) {
          setUser(undefined);
          return;
        }
        setSession(session);
        setUser(detailMySelf);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setUser(undefined);
      }
    };

    getInitialSession();
  }, [user]);

  return {
    user,
    session,
    loading,
  };
}
