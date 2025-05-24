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
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import RenderIconMenu from '../Layouts/RenderIconMenu';

export function NavMain() {
  const { data: session } = useSession();

  const router = useRouter();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>List Menu</SidebarGroupLabel>

      <SidebarMenu>
        {session?.user?.menu?.map((item) => (
          <Collapsible key={item.label}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={item.label}>
                <CollapsibleTrigger asChild className="cursor-pointer" data-test={item.label}>
                  <div>
                    <RenderIconMenu menuItem={item.label} size={16} />

                    <span className={cn('text-sm')}>{item.label}</span>
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
                        <SidebarMenuSubItem key={subItem.menu}>
                          <SidebarMenuSubButton
                            asChild
                            className={cn(
                              router.pathname === subItem.url.split('?')[0] ? 'bg-muted  ' : '',
                            )}
                          >
                            <Link
                              href={subItem.url}
                              className="text-xs"
                              data-test={`${item.label}-${subItem.menu}`}
                            >
                              <span className="text-xs">{subItem.menu}</span>
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
