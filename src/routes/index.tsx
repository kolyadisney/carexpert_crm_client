import { IRoutesTree } from '@/routes/types';
import {
  CarOutlined,
  ControlOutlined,
  FileDoneOutlined,
  IdcardOutlined,
  ProfileOutlined,
  ReadOutlined,
  SketchOutlined,
} from '@ant-design/icons';
import React from 'react';

export const routes: IRoutesTree = {
  login: {
    path: '/login',
    name() {
      return 'Вход';
    },
    link() {
      return this.path;
    },
  },
  dashboard: {
    path: '/',
    name() {
      return 'Главная';
    },
    link() {
      return this.path;
    },
    icon: <SketchOutlined />,
  },
  users: {
    path: '/settings/users',
    name() {
      return 'Пользователи';
    },
    link() {
      return this.path;
    },
    icon: <ProfileOutlined />,
  },
  clients: {
    path: '/clients',
    name() {
      return 'Клиенты';
    },
    link() {
      return this.path;
    },
    icon: <IdcardOutlined />,
    isMenuItem: true,
  },
  client: {
    path: `/clients/:id([0-9]+)`,
    name() {
      return 'Клиент';
    },
    link(id: string) {
      return `/clients/${id}`;
    },
  },
  cars: {
    path: '/cars',
    name() {
      return 'Авто';
    },
    link() {
      return this.path;
    },
    icon: <CarOutlined />,
    isMenuItem: true,
  },
  car: {
    path: `/cars/:id([0-9]+)`,
    name() {
      return 'Авто';
    },
    link(id: string) {
      return `/cars/${id}`;
    },
  },
  orders: {
    path: '/orders',
    name() {
      return 'Заказы';
    },
    link() {
      return this.path;
    },
    icon: <FileDoneOutlined />,
    isMenuItem: true,
  },
  order: {
    path: '/orders/:id',
    name(order_name: string) {
      return `Заказ: № ${order_name}`;
    },
    link(id: string) {
      return `/orders/${id}`;
    },
  },
  appointments: {
    path: '/appointments',
    name() {
      return 'Записи на обслуживание';
    },
    link() {
      return this.path;
    },
    icon: <ReadOutlined />,
    isMenuItem: true,
  },
  profile: {
    path: '/profile',
    name() {
      return 'Профиль';
    },
    link() {
      return this.path;
    },
  },
  settings: {
    path: '/settings',
    name() {
      return 'Настройки';
    },
    link() {
      return this.path;
    },
    icon: <ControlOutlined />,
    isMenuItem: true,
    children: ['services', 'parts', 'users'],
  },
  services: {
    path: '/settings/services',
    name() {
      return 'Услуги';
    },
    link() {
      return this.path;
    },
  },
  parts: {
    path: '/settings/parts',
    name() {
      return 'Запчасти';
    },
    link() {
      return this.path;
    },
  },
};
