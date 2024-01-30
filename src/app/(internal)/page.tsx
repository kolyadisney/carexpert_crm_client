'use client';
import { Box, PageHeading } from '@/components';
import { routes } from '@/routes';
import { Typography } from 'antd';

export default async function Home() {
  return (
    <Box>
      <PageHeading title={routes['dashboard'].name()} />
      <Typography.Text>Тут будет какая-то важная информация</Typography.Text>
    </Box>
  );
}
