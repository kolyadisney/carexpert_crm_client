'use client';
import React from 'react';
import { Button, Form, Input, notification, Typography } from 'antd';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes';

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const res = await signIn('credentials', {
      login: values.login,
      password: values.password,
      redirect: false,
    });

    if (res && !res.error) {
      router.push(routes['clients'].link());
    } else {
      setLoading(false);
      notification.error({
        message: 'Неверно введены логин и пароль',
      });
      router.push(routes['login'].link());
    }
  };
  return (
    <div className={'app-page-auth layout'}>
      <Typography.Title level={3}>Вход</Typography.Title>
      <Form onFinish={handleSubmit}>
        <Form.Item name={'login'}>
          <Input type={'email'} allowClear />
        </Form.Item>
        <Form.Item name={'password'}>
          <Input.Password allowClear />
        </Form.Item>
        <Button htmlType={'submit'} type={'primary'} loading={loading} block>
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
