'use client'
import Image from "next/image";
import {Layout, Menu} from "antd";
import {ControlOutlined, FileDoneOutlined, IdcardOutlined, SketchOutlined,} from "@ant-design/icons";
import {usePathname, useRouter} from "next/navigation";
import {ItemType, MenuItemType} from "antd/es/menu/hooks/useItems";
import React, {useState} from "react";

export const Sidebar: React.FC<any> = () => {
    const pathname = usePathname();
    const redirect = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const menuItems: ItemType<MenuItemType>[] = [
        {
            key: '/',
            icon: <SketchOutlined/>,
            onClick: () => redirect.push('/'),
            label: 'Главная',
        },
        {
            key: '/clients',
            icon: <IdcardOutlined/>,
            onClick: () => redirect.push('/clients'),
            label: 'Клиенты',
        },
        {
            key: '/orders',
            icon: <FileDoneOutlined/>,
            onClick: () => redirect.push('/orders'),
            label: 'Заказы',
        },
        {
            key: '/settings',
            icon: <ControlOutlined/>,
            onClick: () => redirect.push('/settings'),
            label: 'Настройки',
        },
    ]
    return (
        <Layout.Sider className={'app-sidebar'} defaultCollapsed={false} collapsible width={260} collapsedWidth={60}
                      onCollapse={() => setIsCollapsed(!isCollapsed)}>
            <div className="app-logo">
                {!isCollapsed ? (
                        <Image src={'/logo-new.png'} alt={'logo'} width={100} height={60}/>
                    )
                    : (
                        <Image src={'/collapsed-logo-new.png'} alt={'logo'} width={100} height={60}/>
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
    );
};
