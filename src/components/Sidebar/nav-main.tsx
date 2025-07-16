import { ChevronRight } from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import useGetListMenu from '@/querries/menu';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { match } from 'ts-pattern';
import { Skeleton } from '../ui/skeleton';

export function NavMain() {
  const router = useRouter();
  const { data: listMenu, isLoading } = useGetListMenu();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>List Menu</SidebarGroupLabel>

      <SidebarMenu>
        {match(isLoading)
          .with(true, () => {
            return (
              <>
                {[1, 2, 3].map((i) => (
                  <Collapsible key={`skeleton-group-${i}`}>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <div>
                          <Skeleton className="bg-gray-300 rounded-full w-6 h-5" />
                          <Skeleton className="bg-gray-300 rounded w-full h-4" />
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
              </>
            );
          })
          .otherwise(() => {
            return listMenu?.map((item) => (
              <Collapsible key={item.groupMenu}>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.groupMenu}>
                    <CollapsibleTrigger
                      asChild
                      className="cursor-pointer"
                      data-test={item.groupMenu}
                    >
                      <div>
                        {item.icon}

                        <span className={cn('text-sm')}>{item.groupMenu}</span>
                      </div>
                    </CollapsibleTrigger>
                  </SidebarMenuButton>
                  {item.menus?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight size={16} />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="CollapsibleContent">
                        <SidebarMenuSub>
                          {item.menus?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={cn(
                                  router.pathname === subItem.href.split('?')[0]
                                    ? 'bg-muted  '
                                    : '',
                                )}
                              >
                                <Link
                                  href={subItem.href}
                                  className="text-xs"
                                  data-test={`${item.groupMenu}-${subItem.title}`}
                                >
                                  <span className="text-xs">{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ));
          })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
