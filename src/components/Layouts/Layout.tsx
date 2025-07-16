import { useDetectUserAFK } from '@/hooks/useDetectInactiveUser';

import React, { ReactNode } from 'react';

import { AppSidebar } from '../Sidebar/app-sidebar';
import { Separator } from '../ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import ProtectedRoute from './Protection';
import SearchMenu from './SearchMenu';
import UserLogged from './UserLogged';

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
        <SidebarInset className="overflow-auto h-[90vh]  print:fixed print:inset-0  print:margin-r-72 print:z-[9999] print:border-none print:shadow-none relative">
          <header className="sticky top-0 z-10 self-start bg-background w-full flex h-16 shrink-0 items-center px-6 gap-2 print:hidden border-b-[0.5px]">
            <div className="flex items-center gap-2 ">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4  mr-2" />
            </div>
            <div className="flex gap-4 items-center ml-auto ">
              <SearchMenu />

              <UserLogged />
            </div>
          </header>
          <div className="grid grid-cols-1   pt-0 relative ">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default Layout;
