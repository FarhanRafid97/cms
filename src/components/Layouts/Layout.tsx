import React, { ReactNode } from 'react';

import { useGetDynamicUrl } from '@/hooks/useGetDyanmicUrl';
import { useRightSidebarStore } from '@/store/right-sidebar';
import { PanelRight, PanelRightOpen } from 'lucide-react';
import { AppSidebar } from '../Sidebar/app-sidebar';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import ProtectedRoute from './Protection';

interface ILayoutProps {
  children: ReactNode;
  id?: string;
}
const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const { pathname } = useGetDynamicUrl();
  console.log('pathname', pathname);
  const isEditable = pathname.startsWith('/dashboard/post/detail');
  const { isOpen, toggleSidebar } = useRightSidebarStore();
  return (
    <ProtectedRoute>
      <SidebarProvider className="bg-sidebar flex justify-center ">
        <AppSidebar className="print:hidden " />
        <SidebarInset className="overflow-x-hidden overflow-y-auto h-[90vh]  print:fixed print:inset-0  print:margin-r-72 print:z-[9999] print:border-none print:shadow-none relative border-[0.5px] border-border-clean  shadow-box-shadow-clean">
          <header className="sticky top-0 z-10 self-start bg-background w-full flex h-12 shrink-0 items-center px-6 gap-2 print:hidden border-b-[0.5px]">
            <div className="flex items-center gap-2 ">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="h-4  mr-2" />
            </div>
            {isEditable ? (
              <div className="flex gap-4 items-center ml-auto ">
                {' '}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    toggleSidebar();
                  }}
                >
                  {isOpen ? <PanelRightOpen size={16} /> : <PanelRight size={16} />}
                </Button>
              </div>
            ) : null}
          </header>
          <div className="grid grid-cols-1   pt-0 relative ">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

export default Layout;
