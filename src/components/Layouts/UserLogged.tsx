import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logoutHandler } from '@/store/logout';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import { ExitIcon } from '@radix-ui/react-icons';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import SelectTheme from './SelectTheme';

const UserLogged = () => {
  const { data } = useSession();

  const router = useRouter();
  return (
    <>
      <SelectTheme />
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="flex gap-2 items-center focus:outline-none">
            <Avatar>
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_BRISTARS_PHOTO_URL}/${encodeURIComponent(
                  btoa(`${data?.user.PersonalNumber}`),
                )}`}
                alt="@shadcn"
              />
              <AvatarFallback>user</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[9999] w-[220px] mr-2">
          <DropdownMenuLabel>
            <DropdownMenuArrow />
            <p className="text-xs">{data?.user.Nama}</p>
            <p className="text-xs font-[400] text-gray-400">{data?.user.PersonalNumber}</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                if (data?.user.bristarsUrl) {
                  logoutHandler();
                  const link = document.createElement('a');
                  link.href = data?.user.bristarsUrl;
                  link.click();
                } else {
                  router.push('/atmind666');
                }
              });
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
