import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { setSearchMenuTogle, useOpenSearchMenu } from '@/store/searchMenu';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Fragment, useRef } from 'react';
import RenderIconMenu from './RenderIconMenu';
import { cn } from '@/lib/utils';

const ListMenuSearch = () => {
  const { isOpen } = useOpenSearchMenu();
  const refCommand = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  const router = useRouter();
  useOutsideClick({ isOpen, ref: refCommand, setIsOpen: setSearchMenuTogle });
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-primary/70 z-[9999] flex justify-center items-center">
      <Command ref={refCommand} className="absolute max-w-xl  rounded border h-fit">
        <CommandInput placeholder="Type a menu or search..." autoFocus={true} />
        <CommandList>
          <CommandEmpty>No Menu found.</CommandEmpty>
          {session?.user?.menu?.map((groupMenu, idx) => (
            <Fragment key={idx}>
              <CommandGroup heading={groupMenu.label}>
                {groupMenu.menus.map((menu) => (
                  <CommandItem
                    key={menu.url}
                    className={cn('flex items-center gap-2')}
                    value={menu.url + menu.menu}
                    onSelect={() => {
                      setSearchMenuTogle(false);
                      router.push(menu.url);
                    }}
                  >
                    <RenderIconMenu menuItem={menu.headerMenu} size={12} />
                    {menu.menu}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Fragment>
          ))}
        </CommandList>
      </Command>
    </div>
  );
};

export default ListMenuSearch;
