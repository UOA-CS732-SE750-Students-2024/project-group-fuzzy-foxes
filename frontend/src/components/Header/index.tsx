import { useResponsive } from "ahooks";
import {
  Col,
  ConfigProvider,
  Image,
  Row,
  Space,
  theme,
  Typography,
  Button,
} from "antd";
import { FC, ReactNode, useMemo } from "react";

import Logo from "../../assets/logo.png";

import RealTime from "./RealTime";

const { Title, Text } = Typography;

const { useToken } = theme;

type HeaderProps = {
  children: ReactNode;
};

const Header: FC<HeaderProps> = ({ children }) => {
  const { token } = useToken();
  // Get responsive information。
  const { md } = useResponsive();

  /**
   * @description:Render subtext
   */
  const renderSecondary = (text: string) => (
    <Text type="secondary" style={{ fontSize: 12 }}>
      {text}
    </Text>
  );

  /**
   * @description: render logo and title
   */
  const renderTitle = useMemo(
    () => (
      <Space>
        <Image src={Logo} alt="Trendy" width={50} height={50} preview={false} />
        <Space direction="vertical" size={0} style={{ display: "flex" }}>
          <ConfigProvider
            theme={{
              components: {
                Typography: {
                  titleMarginBottom: 0,
                  // 此 Token 不生效
                  titleMarginTop: 0,
                },
              },
            }}
          >
            <Title level={4} style={{ marginTop: 0 }}>
              Trendy
            </Title>
          </ConfigProvider>
          {renderSecondary(
            "Gather all the hottest topics from across the internet."
          )}
        </Space>
      </Space>
    ),
    []
  );

  const renderButtons = (
    <Space>
      <Button>Login</Button>
      <Button>Signup</Button>
    </Space>
  );

  return (
    <div
      id="hot-header"
      style={{
        background: token.colorBgContainer,
        boxShadow: token.boxShadowTertiary,
      }}
    >
      {md ? (
        <Row align="middle">
          {/* title */}
          <Col span={8}>{renderTitle}</Col>
          {/* update date */}
          <Col span={8}>
            <RealTime />{" "}
          </Col>

          {/* theme color */}
          <Col span={8}>
            {children}
            {renderButtons}
          </Col>
        </Row>
      ) : (
        <Row wrap={false}>
          {/* title */}
          <Col flex="auto">{renderTitle}</Col>

          {/* theme color */}
          <Col flex="none">
            {children}
            {renderButtons}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Header;
