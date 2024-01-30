'use client';
import { Skeleton } from 'antd';
import React from 'react';

export default function LoadingFallback() {
  return <Skeleton loading={true} />;
}
