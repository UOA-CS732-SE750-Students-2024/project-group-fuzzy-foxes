/*
 * @Description: hover button
 */
import { SettingOutlined } from "@ant-design/icons";
import { useBoolean } from "ahooks";
import {
  App,
  Card,
  Drawer,
  Flex,
  FloatButton,
  Space,
  Switch,
  Typography,
} from "antd";
import { concat, eq, filter, includes, map } from "lodash-es";
import { FC, useState } from "react";

import { LOCAL_KEY, THEME } from "@/enums";
import type { HotListConfig, HotTypes, ThemeName } from "@/types";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils";

import { hotDataSource } from "../HotContainer/config";
import MoonIcon from "./MoonIcon";
import SunnyIcon from "./SunnyIcon";
import ThemeIcon from "./ThemeIcon";

const { Text } = Typography;

type ActionButtonsProps = {
  setHotConfig: (value: HotListConfig[]) => void;
  filterHiddenHot: () => HotListConfig[];
  isDark: boolean;
  setSiteTheme: (value: ThemeName) => void;
};

const ActionButtons: FC<ActionButtonsProps> = ({
  setHotConfig,
  filterHiddenHot,
  isDark,
  setSiteTheme,
}) => {
  const { message } = App.useApp();
  // Controlled deployment, needs to be used together with trigger
  const [open, setOpen] = useState<boolean>(false);
  // drawer
  const [showDrawer, { setTrue: setDrawerTrue, setFalse: setDrawerFalse }] =
    useBoolean(false);

  /**
   * @description: Switch hot list callback
   */
  const onChangeHotShow = (
    checked: boolean,
    value: HotTypes,
    label: string
  ) => {
    // List not displayed
    const hiddenHotList =
      getLocalStorageItem<HotTypes[]>(LOCAL_KEY.HOTHIDDEN) || [];
    //true: remove from the list, otherwise add to the list
    const result = checked
      ? filter(hiddenHotList, (item: HotTypes) => !eq(item, value))
      : concat(hiddenHotList, value);
    setLocalStorageItem(LOCAL_KEY.HOTHIDDEN, result);
    setHotConfig(filterHiddenHot());
    message.success(`${checked ? "Open" : "Close"} ${label} Successfully`);
  };

  /**
   * @description: Render display settings
   */
  const renderShowSwitch = () => {
    //List not displayed
    const hiddenHotList =
      getLocalStorageItem<HotTypes[]>(LOCAL_KEY.HOTHIDDEN) || [];
    return (
      <Flex justify="space-around" align="center" gap="small" wrap="wrap">
        {map(hotDataSource, ({ value, label }: HotListConfig) => (
          <Card bodyStyle={{ width: 200 }} key={value}>
            <Flex justify="space-between" align="center">
              <Space align="center">
                <Text>{label}</Text>
              </Space>
              <Switch
                disabled={
                  filterHiddenHot().length <= 1 &&
                  !includes(hiddenHotList, value)
                }
                checkedChildren="Open"
                unCheckedChildren="Close"
                onChange={(checked) => onChangeHotShow(checked, value, label)}
                checked={!includes(hiddenHotList, value)}
              />
            </Flex>
          </Card>
        ))}
      </Flex>
    );
  };

  /**
   * @description: switch theme
   */
  const onChangeTheme = () => {
    // toggleAnimationTheme(e, isDark);
    setSiteTheme(isDark ? THEME.LIGHT : THEME.DARK);
  };
  return (
    <>
      <FloatButton.Group
        open={open}
        icon={<ThemeIcon />}
        badge={{ dot: true }}
        trigger="click"
        onOpenChange={(open) => setOpen(open)}
      >
        {/* dark mode */}
        <FloatButton
          icon={isDark ? <SunnyIcon /> : <MoonIcon />}
          tooltip={`${isDark ? "Light" : "Dark"} Theme`}
          onClick={onChangeTheme}
        />
        {/* Hot list display settings */}
        <FloatButton
          icon={<SettingOutlined />}
          tooltip="Hot topics display preferences"
          onClick={() => setDrawerTrue()}
        />

        {/* back to top */}
        <FloatButton.BackTop visibilityHeight={100} tooltip="Back to top" />
      </FloatButton.Group>
      {/* drawer */}
      <Drawer
        title="Hot topics display preferences"
        open={showDrawer}
        onClose={() => setDrawerFalse()}
        width={500}
      >
        {renderShowSwitch()}
      </Drawer>
    </>
  );
};
export default ActionButtons;
