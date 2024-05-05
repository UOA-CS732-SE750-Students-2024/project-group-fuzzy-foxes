import { isNaN, round } from "lodash-es";

/**
 * @description: get value of localstorage
 */
export const getLocalStorageItem = <T>(key: string): T | null => {
  //get value
  const item = localStorage.getItem(key);
  // detremine null or not
  if (item === null) {
    return null;
  }
  // Returns the parsed value if not empty
  const result: T = JSON.parse(item);
  return result;
};

/**
 * @description: store value of localstorage
 */
export const setLocalStorageItem = <T>(key: string, value: T) => {
  const result = JSON.stringify(value);
  localStorage.setItem(key, result);
};

/**
 * @description: remove value of localstorage
 */
export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key);
};

/**
 * @description:conversion numbers (optional)
 */
export const formatNumber = (num: number | string): number | string => {
  num = Number(num);
  if (isNaN(num)) {
    return num;
  }
  const unit = "w";
  num /= 10000;
  num = round(num, 2);
  return num + unit;
};
