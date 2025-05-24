import RenderIconMenu from '@/components/Layouts/RenderIconMenu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { listMenu } from '@/lib/list-menu';
import { cn } from '@/lib/utils';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, Fragment } from 'react';
import { match } from 'ts-pattern';

interface BreadcrumbURLProps {
  id?: string;
  className?: string;
}

interface BreadcrumbProps {
  text: string;
  href: string;
  isValid: boolean;
}

export const useBreadcrumbs = (id: string | undefined): BreadcrumbProps[] => {
  const { pathname } = useRouter();

  const menus = listMenu.flatMap((d) => {
    return d.menus.map((menu) => menu.href);
  });

  const pathSegments = pathname.replace(/(^\/)|(\/$)/g, '').split('/');

  if (id) {
    pathSegments[pathSegments.length - 1] = id;
  }
  const breadcrumbs: BreadcrumbProps[] = [];

  pathSegments.reduce((acc, segment) => {
    const href = `${acc}/${segment}`;
    breadcrumbs.push({
      text: decodeURIComponent(segment),
      href,
      isValid: !!menus?.includes(href) && pathname !== href,
    });
    return href;
  }, '');

  return breadcrumbs;
};

const BreadcrumbURL: FC<BreadcrumbURLProps> = ({ id, className }) => {
  const menuBreadCrumb = useBreadcrumbs(id);
  const isLongBreadcrumb = menuBreadCrumb.length > 3;

  return (
    <TooltipProvider>
      <div className={cn('py-1.5 px-1', className)}>
        <Breadcrumb>
          <BreadcrumbList
            key="home-default"
            className="flex items-center flex-nowrap gap-1 overflow-x-auto scrollbar-hide"
          >
            <Link href="/">
              <BreadcrumbItem className="flex items-center text-xs gap-0.5 text-muted-foreground hover:text-foreground transition-colors">
                <Home size={14} strokeWidth={1.75} className="shrink-0" />
                <span className="hidden sm:inline">Home</span>
              </BreadcrumbItem>
            </Link>

            {isLongBreadcrumb ? (
              <>
                <BreadcrumbSeparator>
                  <ChevronRight size={12} className="text-muted-foreground/70" />
                </BreadcrumbSeparator>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <BreadcrumbItem className="flex items-center text-xs text-muted-foreground">
                      ...
                    </BreadcrumbItem>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs">
                      {menuBreadCrumb.slice(0, menuBreadCrumb.length - 2).map((menu) => (
                        <div key={menu.href} className="flex items-center gap-1 py-0.5">
                          <RenderIconMenu size={12} menuItem={menu.text} />
                          {menu.text}
                        </div>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>

                {menuBreadCrumb.slice(-2).map((menu) => (
                  <Fragment key={menu.href}>
                    <BreadcrumbSeparator>
                      <ChevronRight size={12} className="text-muted-foreground/70" />
                    </BreadcrumbSeparator>
                    <RenderBreadcrumbItem
                      menu={menu}
                      isLast={menuBreadCrumb[menuBreadCrumb.length - 1].href === menu.href}
                    />
                  </Fragment>
                ))}
              </>
            ) : (
              menuBreadCrumb.map((menu) => (
                <Fragment key={menu.href}>
                  <BreadcrumbSeparator>
                    <ChevronRight size={12} className="text-muted-foreground/70" />
                  </BreadcrumbSeparator>
                  <RenderBreadcrumbItem
                    menu={menu}
                    isLast={menuBreadCrumb[menuBreadCrumb.length - 1].href === menu.href}
                  />
                </Fragment>
              ))
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </TooltipProvider>
  );
};

// Extracted component for cleaner rendering
const RenderBreadcrumbItem: FC<{ menu: BreadcrumbProps; isLast: boolean }> = ({ menu, isLast }) => {
  return match(menu.isValid)
    .with(true, () => (
      <Link
        href={menu.href}
        key={menu.href}
        className="focus:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
      >
        <BreadcrumbItem
          className={cn(
            'flex items-center gap-0.5 text-xs whitespace-nowrap transition-colors',
            isLast ? 'font-medium text-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          <RenderIconMenu size={14} menuItem={menu.text} className="shrink-0" />
          <span className="truncate max-w-[120px] sm:max-w-[180px]">{menu.text}</span>
        </BreadcrumbItem>
      </Link>
    ))
    .otherwise(() => (
      <BreadcrumbItem key={menu.href}>
        <BreadcrumbLink
          className={cn(
            'flex items-center gap-0.5 text-xs whitespace-nowrap',
            isLast ? 'font-medium text-foreground' : 'text-muted-foreground',
          )}
        >
          <RenderIconMenu size={14} menuItem={menu.text} className="shrink-0" />
          <span className="truncate max-w-[120px] sm:max-w-[180px]">{menu.text}</span>
        </BreadcrumbLink>
      </BreadcrumbItem>
    ));
};

export default BreadcrumbURL;
