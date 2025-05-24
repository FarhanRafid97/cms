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
import { listMenu } from '@/lib/list-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

export function NavMain() {
  const router = useRouter();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>List Menu</SidebarGroupLabel>

      <SidebarMenu>
        {listMenu.map((item) => (
          <Collapsible key={item.groupMenu}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.groupMenu}>
                <CollapsibleTrigger asChild className="cursor-pointer" data-test={item.groupMenu}>
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
                              router.pathname === subItem.href.split('?')[0] ? 'bg-muted  ' : '',
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
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
