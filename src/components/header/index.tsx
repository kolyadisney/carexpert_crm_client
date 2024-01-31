'use client';
import { Avatar, Tag, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { memo } from 'react';
import { Loader } from '@/components';
import { UserRoleColors, UserRoleNames } from '@/enums/roles';
import { useGetCurrentUserQuery } from '@/redux/api/user';
import { BreakPoint, useIsBreakpoint } from '@/hooks/useIsBreakpoint';

export const Header: React.FC<any> = memo(() => {
  const pathname = usePathname();
  const isMobile = useIsBreakpoint(BreakPoint.MD);
  const isActive = pathname === '/profile';
  const { data, isLoading, isError, error } = useGetCurrentUserQuery(null);

  return (
    <div className={'app-header'}>
      <Link href={'/profile'}>
        {isLoading && <Loader className={'mr-4'} />}
        {!isLoading && data && (
          <>
            {!isMobile && (
              <Tag className={UserRoleColors[data?.role]}>
                {UserRoleNames[data.role]}
              </Tag>
            )}
            <Typography.Text>
              {data.first_name} {data.last_name}
            </Typography.Text>
          </>
        )}
        <Avatar
          icon={<UserOutlined />}
          size={'default'}
          shape={'square'}
          className={`${isActive ? 'active' : ''}`}
        />
      </Link>
    </div>
  );
});

Header.displayName = 'Header';
