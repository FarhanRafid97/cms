import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/Auth';
import { supabase } from '@/lib/supabase';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import { ExitIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';
import SelectTheme from './SelectTheme';

const UserLogged = () => {
  const { user } = useAuth();

  const router = useRouter();
  return (
    <>
      <SelectTheme />
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="flex gap-2 items-center focus:outline-none">
            <Avatar>
              <AvatarImage alt="@shadcn" src={user?.detail_user?.avatar_url || ''} />
              <AvatarFallback>user</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[9999] w-[220px] mr-2">
          <DropdownMenuLabel>
            <DropdownMenuArrow />
            <div className="text-sm">
              <div>
                Welcome, <span className="font-bold">{user?.detail_user?.username}</span>
              </div>
              <div className="mt-2 font-[300] text-xs">
                <span>{user?.detail_user?.email}</span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              supabase.auth.signOut();
              router.push('/login');
            }}
          >
            <ExitIcon width={16} height={16} className="mr-2" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserLogged;
