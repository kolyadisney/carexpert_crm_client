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
import { useRouter } from 'next/navigation';
import { UserRoleColors, UserRoleNames } from '@/enums/roles';
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
      <Col span={24} sm={12} xs={12}>
        <Box>
          <div className="app-profile">
            <Avatar
              shape={'circle'}
              size={'large'}
              icon={<UserOutlined />}
              className={'!mb-4'}
            />
            <Typography.Title level={3}>
              {data?.first_name} {data?.last_name}
            </Typography.Title>
            <Tag className={UserRoleColors[data?.role!]}>
              {UserRoleNames[data?.role!]}
            </Tag>
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
