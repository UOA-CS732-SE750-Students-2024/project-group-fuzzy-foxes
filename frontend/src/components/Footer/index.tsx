import { CopyrightOutlined } from '@ant-design/icons'
import { Divider, Row, Space, Typography } from 'antd'
import { FC } from 'react'

const { Text } = Typography;

const Footer: FC = () => {
  return (
    <Space direction="vertical" size="small" style={{ display: 'flex', padding: '20px 0' }}>
      <Row justify="center" align="middle">
        <Space size="small" align="center" wrap>
          <Text type="secondary"><CopyrightOutlined style={{ marginRight: 5 }} />Power by Fuzzy Foxes</Text>

        </Space>
        <Divider type="vertical" />
        <Space size="small" align="center" wrap>

        </Space>
      </Row>

    </Space>
  )
}
export default Footer