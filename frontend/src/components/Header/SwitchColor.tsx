import { blue, green, presetPalettes, red } from "@ant-design/colors";
import { DownOutlined } from "@ant-design/icons";
import type { ColorPickerProps } from "antd";
import { ColorPicker, Row, Tooltip } from "antd";
import type { Color } from "antd/es/color-picker";
import { FC, useState } from "react";

import { LOCAL_KEY } from "@/enums";
import { setLocalStorageItem } from "@/utils";
type Presets = Required<ColorPickerProps>["presets"][number];

type SwitchColorProps = {
  setPrimaryColor: (color: string) => void;
};

const SwitchColor: FC<SwitchColorProps> = ({ setPrimaryColor }) => {
  // show color selector
  const [openColor, setOpenColor] = useState(false);
  // Default color
  const genPresets = (presets = presetPalettes) =>
    Object.entries(presets).map<Presets>(([label, colors]) => ({
      label,
      colors,
    }));

  const presets = genPresets({
    blue,
    red,
    green,
  });

  /**
   * @description: switch color
   */
  const changeColor = (color: Color) => {
    setPrimaryColor(color.toHexString());
    setLocalStorageItem(LOCAL_KEY.PRIMARYCOLOR, color.toHexString());
  };
  return (
    <Row justify="end">
      {/* theme color */}
      <Tooltip title="Theme Color">
        <ColorPicker
          onOpenChange={setOpenColor}
          onChangeComplete={changeColor}
          presets={presets}
          showText={() => <DownOutlined rotate={openColor ? 180 : 0} />}
        />
      </Tooltip>
    </Row>
  );
};
export default SwitchColor;
