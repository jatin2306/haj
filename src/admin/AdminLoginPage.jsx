import { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, ConfigProvider, Form, Input, Typography, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { adminLogin, isAdminAuthenticated } from './auth';

const { Title, Text } = Typography;

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from === '/admin/login' ? '/admin' : location.state?.from || '/admin';

  useEffect(() => {
    document.body.classList.add('adminBody');
    return () => document.body.classList.remove('adminBody');
  }, []);

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const onFinish = ({ username, password }) => {
    if (adminLogin(username, password)) {
      message.success('Signed in');
      navigate(from, { replace: true });
    } else {
      message.error('Invalid username or password');
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#b08d40', borderRadius: 10 },
      }}
    >
      <div className="adminLoginPage">
        <Card className="adminLoginCard" bordered={false}>
          <Title level={3} style={{ marginTop: 0 }}>
            Admin sign in
          </Title>
          <Text type="secondary">A Way to Makkah — dashboard access</Text>
          <Form layout="vertical" onFinish={onFinish} requiredMark="optional" style={{ marginTop: 24 }}>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Enter username' }]}
            >
              <Input prefix={<UserOutlined />} autoComplete="username" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Enter password' }]}
            >
              <Input.Password prefix={<LockOutlined />} autoComplete="current-password" size="large" />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" size="large" block>
                Sign in
              </Button>
            </Form.Item>
          </Form>
          <Button type="link" href="/" block style={{ marginTop: 8 }}>
            ← Back to website
          </Button>
        </Card>
      </div>
    </ConfigProvider>
  );
}
