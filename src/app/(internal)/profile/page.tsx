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
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';
import { UserRoles } from '@/enums/roles';
import { routes } from '@/routes';
import { useGetCurrentUserQuery } from '@/redux/api/user';

const ProfilePage = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { data, isLoading } = useGetCurrentUserQuery(null);
  const handleLogout = async () => {
    setLoading(true);
    router.push(routes['login'].link());
  };
  const items: DescriptionsProps['items'] = [
    {
      key: 'email',
      label: 'E-mail',
      children: <p>{data?.email}</p>,
    },
    {
      key: 'phone',
      label: 'Телефон',
      children: <p>{data?.phone}</p>,
    },
  ];

  return (
    <Row>
      <Col span={12} sm={24} xs={24}>
        <Box>
          <div className="app-profile">
            <Avatar shape={'circle'} size={'large'} icon={<UserOutlined />} />
            <Typography.Title level={3}>
              {data?.first_name} {data?.last_name}
            </Typography.Title>
            <Tag color={'volcano'}>{UserRoles[data?.role]}</Tag>
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
