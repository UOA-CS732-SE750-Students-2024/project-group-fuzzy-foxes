import { Col } from "antd";
import { map } from "lodash-es";
import { FC } from "react";

import type { HotListConfig } from "@/types";

import HotList from "./HotList";
import Weather from "./Weather";
import GetAdvice from "./GetAdvice";

type HotContainerProps = {
  primaryColor: string;
  hotConfig: HotListConfig[];
  isDark: boolean;
};

const HotContainer: FC<HotContainerProps> = ({
  primaryColor,
  hotConfig = [],
  isDark,
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr",
        gap: "1.2rem",
        padding: "0 4vw",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(20rem, 1fr))",
          gap: "1.2rem",
          padding: "0 4vw",
        }}
      >
        {map(hotConfig, (config: HotListConfig) => (
          <Col span={24} key={config.value}>
            <HotList {...config} primaryColor={primaryColor} isDark={isDark} />
          </Col>
        ))}
      </div>

      {/* right content */}
      <div
        style={{
          gridArea: "1 / 2",

          display: "flex",
          flexDirection: "column",
          gap: "0.8rem",
          width: "300px",
        }}
      >
        {/* First */}
        <div
          style={{
            flex: "2",
            backgroundColor: "#c2bdb5",
            padding: "1rem",
          }}
        >
          Content 1
        </div>

        {/* Second */}
        <div
          style={{
            flex: "2",
            backgroundColor: "#C7B299",
          }}
        >
          <Weather />
          <GetAdvice />
        </div>

        {/* Third */}
        <div
          style={{
            flex: "1",
            backgroundColor: "#c2bdb5",
            padding: "1rem",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Bulletin Board</h2>
          <p>If you encounter a problem while browsing the website.</p>
          <p>Please contact us.</p>
          <p>Our official email address is: FuzzyFox666@example.com.</p>
        </div>
      </div>
    </div>
  );
};
export default HotContainer;
