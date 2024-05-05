/**
 * @description: hotlist types
 */
export type HotTypes =
  | "googleTrends"
  | "aiNews"
  | "twitterTrends"
  | "newsdataIO";

/**
 * @description: form items
 */
export type HotListItem = {
  _id?: string;
  title?: string;
  desc?: string;
  pic?: string;
  hot?: number | string;
  url?: string;
  label?: string;
};

/**
 * @description:List configuration
 */
export type HotListConfig = {
  value: HotTypes;
  label?: string;
  tip?: string;
};

/**
 * @description: update time
 */
export type UpdateTime = Record<HotTypes, number>;

/**
 * @description: theme mode
 */
export type ThemeName = "light" | "dark";
