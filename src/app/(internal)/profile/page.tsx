'use client';
import React from 'react';
import { Box } from '@/components';
import {
  Avatar,
  Button,
  Col,
  Descriptions,
  DescriptionsProps,
  Row,
  Tag,
  Typography,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { useUserStore } from '@/store/user';

const ProfilePage = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const user = useUserStore((state: any) => state.user);
  const handleLogout = async () => {
    setLoading(true);
    await signOut();
    deleteCookie('access_token');
    deleteCookie('refresh_token');
    router.push('/login');
  };
  const items: DescriptionsProps['items'] = [
    {
      key: 'email',
      label: 'E-mail',
      children: <p>{user.email}</p>,
    },
    {
      key: 'phone',
      label: 'Телефон',
      children: <p>{user.phone}</p>,
    },
  ];

  return (
    <Row>
      <Col span={12}>
        <Box>
          <div className="app-profile">
            <Avatar shape={'circle'} size={'large'} icon={<UserOutlined />} />
            <Typography.Title level={3}>
              {user.first_name} {user.last_name}
            </Typography.Title>
            <Tag color={'volcano'}>{user.role}</Tag>
            <Descriptions
              title={'Личная информация'}
              items={items}
              bordered={true}
              column={1}
              size={'small'}
            />
            <Button
              type={'primary'}
              danger
              onClick={handleLogout}
              loading={loading}
              className={'mt-4'}
            >
              Выйти
            </Button>
          </div>
        </Box>
      </Col>
    </Row>
  );
};
export default ProfilePage;
