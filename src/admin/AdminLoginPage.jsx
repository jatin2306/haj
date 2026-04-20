import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, ConfigProvider, Form, Input, Typography, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { loginAdmin } from '../api/blogsAdminApi';
import { isAdminAuthenticated, setAdminToken } from './auth';

const { Title, Text } = Typography;

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const from = location.state?.from === '/admin/login' ? '/admin' : location.state?.from || '/admin';

  useEffect(() => {
    document.body.classList.add('adminBody');
    return () => document.body.classList.remove('adminBody');
  }, []);

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const onFinish = async ({ email, password }) => {
    setIsSubmitting(true);
    try {
      const data = await loginAdmin(email, password);
      const token = data?.token;
      if (!token) {
        message.error('Login response missing token');
        return;
      }
      setAdminToken(token);
      message.success('Signed in');
      navigate(from, { replace: true });
    } catch (e) {
      message.error(e?.message || 'Sign in failed');
    } finally {
      setIsSubmitting(false);
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
          <Text type="secondary">Use the email and password from your Tour &amp; Travels backend user (admin_access).</Text>
          <Form layout="vertical" onFinish={onFinish} requiredMark="optional" style={{ marginTop: 24 }}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Enter email' }, { type: 'email', message: 'Enter a valid email' }]}
            >
              <Input prefix={<MailOutlined />} autoComplete="email" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Enter password' }]}
            >
              <Input.Password prefix={<LockOutlined />} autoComplete="current-password" size="large" />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit" size="large" block loading={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Sign in'}
              </Button>
            </Form.Item>
          </Form>
          <Button type="link" block style={{ marginTop: 8 }} onClick={() => navigate('/')}>
            ← Back to website
          </Button>
        </Card>
      </div>
    </ConfigProvider>
  );
}
