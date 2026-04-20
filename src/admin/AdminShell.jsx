import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, theme, ConfigProvider } from 'antd';
import { BookOutlined, LogoutOutlined, HomeOutlined } from '@ant-design/icons';
import { adminLogout } from './auth';

const { Header, Sider, Content } = Layout;

export default function AdminShell() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    document.body.classList.add('adminBody');
    return () => document.body.classList.remove('adminBody');
  }, []);

  const logout = () => {
    adminLogout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#b08d40', borderRadius: 8 } }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0" width={220} theme="dark">
          <div className="adminLogo">Admin</div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname === '/admin' ? '/admin' : pathname]}
            items={[
              {
                key: '/admin',
                icon: <BookOutlined />,
                label: <Link to="/admin">Blog posts</Link>,
              },
              {
                key: 'site',
                icon: <HomeOutlined />,
                label: <Link to="/">View site</Link>,
              },
            ]}
          />
          <div style={{ padding: 16 }}>
            <Button icon={<LogoutOutlined />} block onClick={logout}>
              Sign out
            </Button>
          </div>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: '0 20px',
              background: colorBgContainer,
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
            }}
          >
            <strong>Blog admin</strong>
          </Header>
          <Content style={{ margin: 24, minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
