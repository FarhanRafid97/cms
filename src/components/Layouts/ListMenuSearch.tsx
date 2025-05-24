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

import { listMenu } from '@/lib/list-menu';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/router';
import { Fragment, useRef } from 'react';

const ListMenuSearch = () => {
  const { isOpen } = useOpenSearchMenu();
  const refCommand = useRef<HTMLDivElement>(null);

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
          {listMenu.map((groupMenu, idx) => (
            <Fragment key={idx}>
              <CommandGroup heading={groupMenu.groupMenu}>
                {groupMenu.menus.map((menu) => (
                  <CommandItem
                    key={menu.href}
                    className={cn('flex items-center gap-2')}
                    value={menu.href + menu.title}
                    onSelect={() => {
                      setSearchMenuTogle(false);
                      router.push(menu.href);
                    }}
                  >
                    {groupMenu.icon}
                    {menu.title}
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
