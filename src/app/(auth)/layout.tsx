'use client';
import { Rubik_Burned } from 'next/font/google';
import '../../styles/global.scss';
import { Carousel, Col, ConfigProvider, Row, theme } from 'antd';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import Image from 'next/image';
import React from 'react';

const inter = Rubik_Burned({
  subsets: ['cyrillic'],
  display: 'swap',
  weight: ['400'],
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
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
          <body className={`app-main`}>
            <Row className={'app-auth-layout'}>
              <Col span={10}>
                <Carousel
                  effect="fade"
                  autoplay
                  vertical
                  draggable={false}
                  dots={false}
                  className={'cross-fade-carousel'}
                  adaptiveHeight={true}
                  autoplaySpeed={5000}
                >
                  <div
                    className={
                      'cross-fade-carousel__item kenburns-animation is-active'
                    }
                  >
                    <Image
                      src={'/slider-images/1.jpg'}
                      width={1000}
                      height={1000}
                      alt={'image'}
                    />
                  </div>
                  <div
                    className={
                      'cross-fade-carousel__item kenburns-animation is-active'
                    }
                  >
                    <Image
                      src={'/slider-images/2.jpg'}
                      width={1000}
                      height={1000}
                      alt={'image'}
                    />
                  </div>
                  <div
                    className={
                      'cross-fade-carousel__item kenburns-animation is-active'
                    }
                  >
                    <Image
                      src={'/slider-images/3.jpg'}
                      width={1000}
                      height={1000}
                      alt={'image'}
                    />
                  </div>
                  <div
                    className={
                      'cross-fade-carousel__item kenburns-animation is-active'
                    }
                  >
                    <Image
                      src={'/slider-images/4.jpg'}
                      width={1000}
                      height={1000}
                      alt={'image'}
                    />
                  </div>
                  <div
                    className={
                      'cross-fade-carousel__item kenburns-animation is-active'
                    }
                  >
                    <Image
                      src={'/slider-images/5.jpg'}
                      width={1000}
                      height={1000}
                      alt={'image'}
                    />
                  </div>
                </Carousel>
                <Image
                  src={'/logo-new.png'}
                  alt={'logo'}
                  width={400}
                  height={400}
                  className={'app-login-logo'}
                />
              </Col>
              <Col span={14} className={'pl-10'}>
                {children}
              </Col>
            </Row>
          </body>
        </html>
      </ConfigProvider>
    </StyledComponentsRegistry>
  );
}
