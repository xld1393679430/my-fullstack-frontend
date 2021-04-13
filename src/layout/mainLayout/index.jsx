import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import './index.css';
import { routers } from '../../router';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const {
    location: { pathname },
  } = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [currentKey, setCurrentKey] = useState('');

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setCurrentKey(pathname);
  }, []);

  return (
    <Layout id="components-layout-demo-custom-trigger">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentKey]}
          onClick={(event) => setCurrentKey(event.key)}
        >
          {routers.map((item) => {
            return !item.hide && (
              <Menu.Item key={item.path} icon={<UserOutlined />}>
                <Link to={item.path}>{item.title}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <span className="trigger" onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
