import Layout from '@/components/Layouts/Layout';
import ListMenuSearch from '@/components/Layouts/ListMenuSearch';
import { ProvideAuth } from '@/context/Auth';
import Providers from '@/querries/Providers';
import { useLogoutUser } from '@/store/logout';
import '@/styles/calendar.css';
import '@/styles/globals.css';
import '@/styles/nprogress.css';
import '@/styles/quil.editor.css';
import '@/styles/carousel.css';
import '@/styles/hero-image.css';
import '@/styles/bento-animations.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Loader2 } from 'lucide-react';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import nProgress from 'nprogress';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { match, P } from 'ts-pattern';
import { ClientOnly } from '@/components/Layouts/WrapperClient';
import { Navbar } from '@/components/Layouts/Navbar';
import { Footerdemo } from '@/components/modules/home-page/footer';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { cn } from '@/lib/utils';

const progress = nProgress.configure({ showSpinner: false });

export default function App({ Component, pageProps: { ...pageProps } }: AppProps) {
  const router = useRouter();

  const { data } = pageProps;

  useEffect(() => {
    // NProgress
    router.events.on('routeChangeStart', () => progress.start());
    router.events.on('routeChangeComplete', () => progress.done());
    router.events.on('routeChangeError', () => progress.done());

    return () => {
      router.events.off('routeChangeStart', () => progress.start());
      router.events.off('routeChangeComplete', () => progress.done());
      router.events.off('routeChangeError', () => progress.done());
    };
  }, [router.events]);
  const { isLogout } = useLogoutUser();

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Unreachable code error
    <ThemeProvider defaultTheme="light" disableTransitionOnChange>
      <ProvideAuth>
        {/* <script src="https://unpkg.com/react-scan/dist/auto.global.js" async /> */}
        <Providers>
          <main className={cn(GeistMono.className, GeistSans.className, '!font-geist-sans')}>
            {isLogout && (
              <div className="fixed bg-background-new/70 backdrop-blur-md inset-0 z-[23123] w-screen h-screen flex justify-center items-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Loader2 size={40} className="animate-spin" />
                  Loading Sign Out...
                </div>
              </div>
            )}
            {match(router.pathname)
              .with('/login', '/update-biodata', () => (
                <div>
                  <Component {...pageProps} />
                </div>
              ))
              .with(P.string.includes('/dashboard'), () => (
                <Layout id={data?.batch || ''}>
                  <Component {...pageProps} />
                  <div className="print:hidden">
                    <ReactQueryDevtools initialIsOpen={false} />
                  </div>
                </Layout>
              ))
              .otherwise(() => (
                <ClientOnly>
                  <div className="relative bg-background-new">
                    <Navbar />

                    <Component {...pageProps} />
                    <div>
                      <Footerdemo />
                    </div>
                  </div>
                </ClientOnly>
              ))}
            <ListMenuSearch />
            <Toaster
              richColors
              visibleToasts={3}
              duration={3000}
              closeButton
              position="top-right"
            />
          </main>
        </Providers>
      </ProvideAuth>
    </ThemeProvider>
  );
}
