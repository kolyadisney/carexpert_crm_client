'use client';
import { Open_Sans } from 'next/font/google';
import '../../styles/global.scss';
import StyledComponentsRegistry from '../../lib/AntdRegistry';
import { ConfigProvider, Layout, theme } from 'antd';
import { Header, Sidebar } from '@/components';
import { ReactQueryProvider } from '@/query';

const inter = Open_Sans({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <StyledComponentsRegistry>
        <ConfigProvider
          theme={{
            algorithm: theme.darkAlgorithm,
            token: {
              colorPrimary: '#f97316',
            },
          }}
        >
          <html lang="en">
            <body className={`${inter.className} app-main`}>
              <Layout hasSider>
                <Sidebar />
                <Layout>
                  <Layout.Header>
                    <Header />
                  </Layout.Header>
                  <Layout.Content>{children}</Layout.Content>
                </Layout>
              </Layout>
            </body>
          </html>
        </ConfigProvider>
      </StyledComponentsRegistry>
    </ReactQueryProvider>
  );
}
