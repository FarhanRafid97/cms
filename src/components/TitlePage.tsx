import { listMenu } from '@/lib/list-menu';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
interface TitlePageProps {
  Icon: ReactNode;
  title: string;
  id?: string;
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

const TitlePage: FC<TitlePageProps> = ({ Icon, title, id }) => {
  const route = useRouter();
  const path = route.pathname.replace('/', '').split('/');

  if (id) {
    path[path.length - 1] = id;
  }
  return (
    <>
      <Head>
        <title>{`MCR-MDB | ${title}` || '-'}</title>
        <link rel="icon" type="image/x-icon" href="/icon-mass-pro.png" />
      </Head>
      <div className="print:hidden mt-6">
        <div className="flex items-center mb-2 gap-2 ">
          <div className="bg-primary p-2 w-fit rounded-md">{Icon}</div>
          <div>
            <h1 className="  text-lg tracking-wide  text-primary">{title}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default TitlePage;
