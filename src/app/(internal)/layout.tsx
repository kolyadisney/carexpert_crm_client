'use client';
import { Montserrat } from 'next/font/google';
import '../../styles/global.scss';
import StyledComponentsRegistry from '../../lib/AntdRegistry';
import { ConfigProvider, Layout, theme } from 'antd';
import { Header, Sidebar } from '@/components';
import { ModalRoot } from '@/components/modals/rootModal';
import dayjs from 'dayjs';
import ruAntd from 'antd/locale/ru_RU';
import ru from 'dayjs/locale/ru';
import Providers from '@/redux/provider';
import React, { Suspense } from 'react';
import LoadingFallback from '@/app/(internal)/loading';
import dayjsPluginUTC from 'dayjs/plugin/utc';
import dayjsPluginTimezone from 'dayjs/plugin/timezone';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';

dayjs.locale(ru);
dayjs.extend(dayjsPluginUTC, { parseToLocal: true });
dayjs.extend(dayjsPluginTimezone);

const inter = Montserrat({ subsets: ['latin'], display: 'swap' });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <QueryClientProvider client={queryClient}>
        <StyledComponentsRegistry>
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
              token: {
                colorPrimary: '#f97316',
              },
            }}
            locale={ruAntd}
          >
            <html lang="en">
              <body className={`${inter.className} app-main`}>
                <Layout hasSider>
                  <Sidebar />
                  <Layout>
                    <Layout.Header>
                      <Header />
                    </Layout.Header>
                    <Suspense fallback={<LoadingFallback />}>
                      <Layout.Content>{children}</Layout.Content>
                    </Suspense>
                  </Layout>
                </Layout>
                <ModalRoot />
              </body>
            </html>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </QueryClientProvider>
    </Providers>
  );
}
