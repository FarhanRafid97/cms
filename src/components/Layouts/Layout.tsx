import { useDetectUserAFK } from '@/hooks/useDetectInactiveUser';

import React, { ReactNode } from 'react';

import { AppSidebar } from '../Sidebar/app-sidebar';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import SearchMenu from './SearchMenu';
import UserLogged from './UserLogged';
import ProtectedRoute from './Protection';

interface ILayoutProps {
  children: ReactNode;
  id?: string;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  useDetectUserAFK();
  return (
    <ProtectedRoute>
      <SidebarProvider className="bg-sidebar flex justify-center ">
        <AppSidebar className="print:hidden " />
        <SidebarInset className="overflow-auto h-[90vh]  print:fixed print:inset-0  print:margin-r-72 print:z-[9999] print:border-none print:shadow-none">
          <header className="flex h-16 shrink-0 items-center gap-2 print:hidden border-b-[0.5px]">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4  mr-2" />
            </div>
            <div className="flex gap-4 items-center ml-auto pr-4">
              <SearchMenu />

              <UserLogged />
            </div>
          </header>
          <ScrollArea className="flex flex-1 flex-col gap-4  pt-0  h-3/4 " id="section-to-print ">
            <div className="grid grid-cols-1 gap-4 print:block">{children}</div>
          </ScrollArea>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default Layout;
