import { isNumber, isString } from "lodash-es";

import type { HotListConfig } from "@/types";

/**
 * @description: Hot list configuration
 */
export const hotDataSource: HotListConfig[] = [
  {
    value: "googleTrends",
    label: "GoogleTrends",
    tip: "Hot",
  },
  {
    value: "aiNews",
    label: "AI News",
    tip: "Hot",
  },
  {
    value: "twitterTrends",
    label: "TwitterTrends",
    tip: "Hot",
  },
];

/**
 * @description: Tag color configuration
 */
export const hotTagColor: Record<string, string> = {
  0: "#ea444d",
  1: "#ed702d",
  2: "#eead3f",
};

/**
 * @description: Formatting popularity (optional)
 */
export const formatNumber = (value: number | string) => {
  if (!isString(value) && !isNumber(value)) {
    return;
  }
  return Math.floor((Number(value) / 10000) * 100) / 100 + "w";
};
