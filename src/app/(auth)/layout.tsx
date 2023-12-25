'use client';
import { Open_Sans } from 'next/font/google';
import '../../styles/global.scss';
import { Carousel, Col, ConfigProvider, Row, theme } from 'antd';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { ReactQueryProvider } from '@/query';

const inter = Open_Sans({ subsets: ['latin', 'cyrillic'] });

export default function AuthLayout({
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
              <Row className={'app-auth-layout'}>
                <Col span={8}>
                  <Carousel
                    arrows={false}
                    dots={false}
                    className={'app-auth-carousel'}
                  >
                    <div>
                      <h3>1</h3>
                    </div>
                    <div>
                      <h3>2</h3>
                    </div>
                    <div>
                      <h3>3</h3>
                    </div>
                  </Carousel>
                </Col>
                <Col span={16}>{children}</Col>
              </Row>
            </body>
          </html>
        </ConfigProvider>
      </StyledComponentsRegistry>
    </ReactQueryProvider>
  );
}
