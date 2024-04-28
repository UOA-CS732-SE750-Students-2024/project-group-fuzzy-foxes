/*
 * yyyy-mm-dd hh:mm:ss
 */
import { useInterval, useUnmount } from "ahooks";
import { Space, Typography } from "antd";
import dayjs from "dayjs";

import { FC, useState } from "react";
const { Text } = Typography;

const RealTime: FC = () => {
  // real time
  const [nowTime, setNowTime] = useState<string>("");

  /**
   * @description: real time timer
   */
  const clearInterval = useInterval(() => {
    setNowTime(dayjs().format("YYYY-MM-DD HH:mm:ss"));
  }, 1000);

  useUnmount(() => {
    clearInterval();
  });
  return (
    <Space
      direction="vertical"
      size={0}
      style={{ display: "flex" }}
      align="center"
      className="hot-header-time"
    >
      {nowTime ? (
        <>
          <Text>{nowTime}</Text>
        </>
      ) : (
        <Text type="secondary">Loading Time...</Text>
      )}
    </Space>
  );
};
export default RealTime;
