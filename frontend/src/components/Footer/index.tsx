import { CopyrightOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { Divider, Row, Space, Typography } from 'antd'
import { FC, useEffect, useState} from 'react'
import axios from 'axios';

const { Text,Link} = Typography;

const Footer: FC = () => {
  const [todayInfo, setTodayInfo] = useState({ title: '', url: '' });
  useEffect(() => {
    const fetchTodayInfo = async () => {
      try {
        const response = await axios.get('https://project-group-fuzzy-foxes-trendy-api.onrender.com/historyTodays');
        // Check if the results array exists and has at least one element
        if (response.data && response.data.results && response.data.results.length > 0) {
          const firstResult = response.data.results[0]; // Access the first item in the results array
          setTodayInfo({
            title: firstResult.title,  // Access the title from the first result
            url: firstResult.url       // Access the url from the first result
          });
        } else {
          // Handle the case where the results array is empty or does not exist
          console.error('No results found or incorrect data structure:', response.data);
          setTodayInfo({ title: 'No title available', url: '' }); // Set defaults or handle appropriately
        }
      } catch (error) {
        console.error('Failed to fetch today info', error);
      }
    };

    fetchTodayInfo();
  }, []);

  return (
    <Space direction="vertical" size="small" style={{ display: 'flex', padding: '20px 0' }}>
      <Row justify="center" align="middle">
        <Space size="small" align="center" wrap>
          <Text type="secondary"><CopyrightOutlined style={{ marginRight: 5 }} />Power by Fuzzy Foxes</Text>

        </Space>
        <Divider type="vertical" />
        <Space size="small" align="center" wrap>
        {todayInfo.url ? (
            <Link href={todayInfo.url} target="_blank" style={{ fontWeight: 'bold', color: '#1DA57A' }}>
              <ClockCircleOutlined style={{ marginRight: 5 }} />
              History Today: {todayInfo.title}
            </Link>
          ) : (
            <Text>Loading today's info...</Text>
          )}
        </Space>
      </Row>

    </Space>
  )
}
export default Footer