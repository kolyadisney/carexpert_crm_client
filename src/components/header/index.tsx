'use client';
import { Avatar, Tag, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useUserStore } from '@/store/user';
import { Loader } from '@/components';

export const Header: React.FC<any> = () => {
  const pathname = usePathname();
  const isActive = pathname === '/profile';
  const fetchUser = useUserStore((state: any) => state.fetchUser);
  const user = useUserStore((state: any) => state.user);
  React.useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className={'app-header'}>
      <Link href={'/profile'}>
        {!user && <Loader className={'mr-4'} />}
        {user && (
          <>
            <Tag color={'volcano'} bordered>
              {user.role}
            </Tag>
            <Typography.Text>
              {user.first_name} {user.last_name}
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
};
