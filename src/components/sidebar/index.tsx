'use client';
import Image from 'next/image';
import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import React, { useState } from 'react';
import { routes } from '@/routes';
import { IRoute, TPageNames } from '@/routes/types';
import { BreakPoint, useIsBreakpoint } from '@/hooks/useIsBreakpoint';

export const Sidebar: React.FC<any> = () => {
  const pathname = usePathname();
  const redirect = useRouter();
  const isMobile = useIsBreakpoint(BreakPoint.MD);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuItems: ItemType<MenuItemType>[] = Object.values(routes)
    .map((route: IRoute) => {
      if (route.isMenuItem) {
        if (route.children) {
          return {
            key: route.path,
            icon: route.icon,
            label: route.name(),
            children: route.children.map((childrenName: TPageNames) => ({
              key: routes[childrenName].path,
              label: routes[childrenName].name(),
              onClick: () => redirect.push(routes[childrenName].link()),
            })),
          };
        } else {
          return {
            key: route.path,
            icon: route.icon,
            label: route.name(),
            onClick: () => redirect.push(route.link()),
          };
        }
      }
      return null;
    })
    .filter(Boolean);
  return (
    <>
      {!isMobile ? (
        <Layout.Sider
          className={'app-sidebar'}
          defaultCollapsed={false}
          collapsible
          width={260}
          collapsedWidth={60}
          onCollapse={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="app-logo">
            {!isCollapsed ? (
              <Image
                src={'/logo-new.png'}
                alt={'logo'}
                width={100}
                height={60}
              />
            ) : (
              <Image
                src={'/collapsed-logo-new.png'}
                alt={'logo'}
                width={100}
                height={60}
              />
            )}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            defaultSelectedKeys={['/']}
            className={'app-menu'}
            items={menuItems}
          />
        </Layout.Sider>
      ) : (
        <div></div>
      )}
    </>
  );
};
