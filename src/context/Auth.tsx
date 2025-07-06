import { supabase } from '@/lib/supabase';
import { NoUser, UserSession } from '@/schema/user/author';
import { getMyself } from '@/service/auth';
import { Session } from '@supabase/supabase-js';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: UserSession | NoUser;
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
  const [user, setUser] = useState<UserSession | NoUser>({
    detail_user: null,
    session: null,
  });
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log('session', !session);
        if (!session) {
          setUser({ detail_user: undefined, session: undefined });
          setLoading(false);
          return;
        }

        const detailMySelf = await getMyself({ user_id: session?.user.id || '' });
        if (!detailMySelf) {
          setUser({ detail_user: undefined, session });
          setLoading(false);
          return;
        }
        setSession(session);
        setUser({ detail_user: detailMySelf, session });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setUser({ detail_user: undefined, session: undefined });
      }
    };

    getInitialSession();
  }, []); // Empty dependency array - only run once on mount

  return {
    user,
    session,
    loading,
  };
}
