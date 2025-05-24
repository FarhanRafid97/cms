'use client';

import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import CutOffTime from '../Layouts/CutOffTime';
import { NavMain } from './nav-main';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                  <div
                    className={`  items-center font-serif p-1 bg-[#09090B] dark:bg-[#09090B] py-2  flex justify-center rounded `}
                  >
                    <Image
                      src="/logo-mass-pro.png"
                      width={35}
                      height={25}
                      alt="logo mass pro"
                      className="object-cover "
                    />
                  </div>
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Mass Pro</span>
                  <span className="truncate text-xs">Mass Kredit / Debet</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="">
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <CutOffTime isShow={true} />
      </SidebarFooter>
    </Sidebar>
  );
}
