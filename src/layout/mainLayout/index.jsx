import React, { useState, useEffect } from 'react';
import { Button, Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import noteServer from '../../services/notes';
import { rooters } from '../../pages/main';
import { userLogoutAction } from '../../actions/userAction';
import './index.css';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const  {
    location: { pathname },
  } = history;
  const [currentKey, setCurrentKey] = useState('');

  const handleLogout = () => {
    noteServer.setToken(null);
    dispatch(userLogoutAction());
    history.push('/login');
  };

  useEffect(() => {
    let _currentKey = pathname;
    if (pathname.startsWith('/main/note')) {
      _currentKey = '/main/notes';
    } else if (pathname === '/main/') {
      _currentKey = '/main/home';
    }
    setCurrentKey(_currentKey);
  }, []);

  return (
    <Layout id="components-layout-demo-custom-trigger">
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentKey]}
          onClick={(event) => setCurrentKey(event.key)}
        >
          {rooters.map((item) => {
            return (
              !item.hide && (
                <Menu.Item key={item.path} icon={<UserOutlined />}>
                  <Link to={item.path}>{item.title}</Link>
                </Menu.Item>
              )
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-header">
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="0">
                  <Button type='link'>关于我</Button>
                </Menu.Item>

                <Menu.Item key="1">
                <Button type='link' onClick={handleLogout}>退出</Button>
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <Avatar
              style={{ backgroundColor: '#87d068' }}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Header>
        <Content
          className="site-layout-content"
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
