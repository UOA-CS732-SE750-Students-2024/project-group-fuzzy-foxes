import { useLocalStorageState } from "ahooks";
import { App, ConfigProvider, theme } from "antd";
import enUS from "antd/locale/en_US";
import { eq, filter, includes } from "lodash-es";
import { useState } from "react";
import { Helmet } from "react-helmet";

import ActionButtons from "@/components/ActionButtons";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import SwitchColor from "@/components/Header/SwitchColor";

import HotContainer from "@/components/HotContainer";
import { LOCAL_KEY, THEME } from "@/enums";
import type { HotListConfig, HotTypes, ThemeName } from "@/types";
import { getLocalStorageItem } from "@/utils";

import { hotDataSource } from "./components/HotContainer/config";

function AppConatiner() {
  // theme color
  const [primaryColor, setPrimaryColor] = useState(
    getLocalStorageItem(LOCAL_KEY.PRIMARYCOLOR) || "#1677ff"
  );
  // theme mode
  const [siteTheme, setSiteTheme] = useLocalStorageState<ThemeName>(
    LOCAL_KEY.THEME,
    { defaultValue: THEME.LIGHT }
  );
  // if dark mode or not
  const isDark = eq(siteTheme, THEME.DARK);
  // login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * @description: Filter hotlist that you don't like
   */

  const filterHiddenHot = (): HotListConfig[] => {
    // List not shown
    const hiddenHotList =
      getLocalStorageItem<HotTypes[]>(LOCAL_KEY.HOTHIDDEN) || [];
    return hiddenHotList.length
      ? filter(
          hotDataSource,
          (config: HotListConfig) => !includes(hiddenHotList, config.value)
        )
      : hotDataSource;
  };
  const [hotConfig, setHotConfig] = useState<HotListConfig[]>(
    filterHiddenHot()
  );
  return (
    <>
      <Helmet encodeSpecialCharacters={false}>
        <html lang="en" data-theme={siteTheme} />
      </Helmet>
      <ConfigProvider
        locale={enUS}
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: primaryColor,
          },
        }}
      >
        <App>
          {/* Header */}
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <SwitchColor setPrimaryColor={setPrimaryColor} />
          </Header>
          {/* HotContainer */}
          <HotContainer
            primaryColor={primaryColor}
            hotConfig={hotConfig}
            isDark={isDark}
          />
          {/* Footer */}
          <Footer />
          {/* hover button */}
          {isLoggedIn && <ActionButtons
            setHotConfig={setHotConfig}
            filterHiddenHot={filterHiddenHot}
            isDark={isDark}
            setSiteTheme={setSiteTheme}
          />}
        </App>
      </ConfigProvider>
    </>
  );
}

export default AppConatiner;
