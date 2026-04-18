import { Card, Col, Row, Statistic, Table, Typography } from 'antd';
import { AppstoreOutlined, BookOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { BLOG_POSTS, HOTELS, PACKAGES, TESTIMONIALS } from '../data/siteData';

const { Title, Paragraph } = Typography;

export default function AdminDashboardPage() {
  const packageColumns = [
    { title: 'Package', dataIndex: 'title', key: 'title', ellipsis: true },
    { title: 'Tier', dataIndex: 'tier', key: 'tier', width: 72 },
    { title: 'Dates', dataIndex: 'dates', key: 'dates', ellipsis: true },
  ];

  return (
    <div>
      <Title level={2} style={{ marginTop: 0 }}>
        Overview
      </Title>
      <Paragraph type="secondary">
        Quick snapshot of content on the public site. Replace this screen with your CMS or API when
        you connect a backend.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Packages" value={PACKAGES.length} prefix={<AppstoreOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Blog posts" value={BLOG_POSTS.length} prefix={<BookOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Hotels listed" value={HOTELS.length} prefix={<HomeOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title="Testimonials" value={TESTIMONIALS.length} prefix={<TeamOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card title="Packages" style={{ marginTop: 24 }}>
        <Table
          size="small"
          rowKey="id"
          pagination={false}
          columns={packageColumns}
          dataSource={PACKAGES}
        />
      </Card>
    </div>
  );
}
