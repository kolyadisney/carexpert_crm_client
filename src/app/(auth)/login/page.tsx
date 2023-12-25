'use client'
import React from 'react';
import {Button, Form, Input, notification} from "antd";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const LoginPage = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const handleSubmit = async (values: any) => {
        setLoading(true);
        const res = await signIn('credentials', {
            login: values.login,
            password: values.password,
            redirect: false
        });

        if(res && !res.error){
            router.push('/')
        }
        else {
            setLoading(false)
            notification.error({
                message: 'Неверно введены логин и пароль'
            })
            router.push('/login');
        }
    }
    return (
        <Form onFinish={handleSubmit}>
            <Form.Item name={'login'}>
                <Input type={'email'}/>
            </Form.Item>
            <Form.Item name={'password'}>
                <Input.Password/>
            </Form.Item>
            <Button htmlType={'submit'} type={'primary'} loading={loading} block>Войти</Button>
        </Form>
    );
};

export default LoginPage
