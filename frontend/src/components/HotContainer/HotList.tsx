import { SyncOutlined } from "@ant-design/icons";
import { useInterval, useRequest, useUnmount } from "ahooks";
import {
  Button,
  Card,
  ConfigProvider,
  Result,
  Row,
  Skeleton,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import { eq, get, map } from "lodash-es";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { LOCAL_KEY } from "@/enums";
import type { HotListConfig, HotListItem, UpdateTime } from "@/types";
import {
  formatNumber,
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/utils";

import { hotTagColor } from "./config";
import styles from "./index.module.scss";

const { Text } = Typography;
dayjs.extend(relativeTime);
dayjs.locale("en");
const backend_url = import.meta.env.VITE_BACKEND_URL;
type HotListProps = {
  primaryColor: string;
  //Is it dark mode
  isDark: boolean;
};

const HotList: FC<HotListConfig & HotListProps> = ({
  value,
  label,
  tip,
  primaryColor,
  isDark = false,
}) => {
  //Real time update time
  const [relativeTime, setRelativeTime] = useState<string>("");

  /**
   * @description: Request list interface
   */
  const { data, loading, run } = useRequest(
    async () => {
      const response = await fetch(backend_url+`${value}`);
      if (eq(response.status, 200)) {
        const result = await response.json();
        console.log(result);
        const updateTime = getLocalStorageItem<UpdateTime>(
          LOCAL_KEY.UPDATETIME
        );
        if (updateTime) {
          setLocalStorageItem(LOCAL_KEY.UPDATETIME, {
            ...updateTime,
            [value]: dayjs().valueOf(),
          });
        } else {
          setLocalStorageItem(LOCAL_KEY.UPDATETIME, {
            [value]: dayjs().valueOf(),
          });
        }
        return result.data || [];
      }
      return [];
    },
    {
      manual: true,

      debounceWait: 300,

      retryCount: 3,
    }
  );

  /**
   * @description: render header(logo,title,tip)
   */
  const renderTitle = useMemo(
    () => (
      <div>
        <Row style={{ justifyContent: "space-between" }}>
          <Space align="center">
            <Text>{label}</Text>
          </Space>
          <Tag
            bordered={false}
            color={primaryColor}
            style={{ fontSize: 12, marginInlineEnd: 0 }}
          >
            {tip}
          </Tag>
        </Row>
      </div>
    ),
    [primaryColor]
  );

  /**
   * @description: render body
   */
  const renderContent = useMemo(() => {
    return data?.list?.length ? (
      <ul className={styles["hot-container"]}>
        {map(get(data, "list", []), (item: HotListItem, index: number) => {
          const hasWeiboLabel: boolean = eq(value, "weibo") && item.label;
          return (
            <li key={item._id}>
              <div className="hot-box">
                <div
                  className="hot-index"
                  style={{
                    background:
                      hotTagColor[index] ||
                      (isDark
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0,0,0,.04)"),
                    color:
                      !isDark && hotTagColor[index] ? "#ffffff" : "inherit",
                  }}
                >
                  {hasWeiboLabel ? item.label : index + 1}
                </div>
                <Text
                  className="hot-title"
                  ellipsis={{ tooltip: item.title }}
                  onClick={() => window.open(item.url)}
                >
                  {item.title}
                </Text>
                {item.hot && (
                  <div
                    className="hot-number"
                    style={{
                      color: !isDark ? "rgba(0, 0, 0, 0.45)" : "inherit",
                    }}
                  >
                    {formatNumber(item.hot)}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    ) : (
      <Result
        status="error"
        title="Load failed"
        subTitle="Sorry, the server may be experiencing issues. Please try again later！🤓"
      />
    );
  }, [data, isDark]);

  /**
   * @description: render footer
   */
  const renderFooter = (): ReactNode[] => {
    return [
      <Text type="secondary" style={{ fontSize: 12 }} key="update">
        {relativeTime ? `Updated ${relativeTime}` : "Loading..."}
      </Text>,
      <Tooltip title="Get Latest">
        <Button
          type="primary"
          shape="round"
          icon={<SyncOutlined spin={loading} />}
          size="small"
          onClick={run}
        />
      </Tooltip>,
    ];
  };

  //Check the web page update time in local storage every second, convert it into relative time text, and then update the display of the relative time
  const clearInterval = useInterval(() => {
    const updateTime = getLocalStorageItem<UpdateTime>(LOCAL_KEY.UPDATETIME);
    //update text
    const updateText = updateTime
      ? dayjs(updateTime[value]).fromNow()
      : dayjs().fromNow();
    setRelativeTime(updateText);
  }, 1000);

  useUnmount(() => {
    clearInterval();
  });

  useEffect(() => {
    if (!data && !loading) {
      run();
    }
  }, []);
  return (
    // display
    <ConfigProvider
      theme={{
        components: {
          List: {
            itemPaddingSM: "8px 0",
          },
          Result: {
            iconFontSize: 30,
            titleFontSize: 16,
            subtitleFontSize: 12,
          },
        },
      }}
    >
      <Card
        title={renderTitle}
        actions={renderFooter()}
        headStyle={{ padding: "0 15px" }}
        bodyStyle={{
          height: 300,
          overflow: "hidden scroll",
          padding: "5px 15px",
        }}
        hoverable
      >
        <Skeleton active loading={loading} paragraph={{ rows: 10 }}>
          {renderContent}
        </Skeleton>
      </Card>
    </ConfigProvider>
  );
};
export default HotList;
