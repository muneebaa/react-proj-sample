export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  IS_FIRST_TIME_LOGIN: "isFirstTimeLogin",
} as const;

export const localStore = {
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  
  getItem: (key: string): string | null => {
    return localStorage.getItem(key);
  },
  
  removeItem: (key: string) => {
    localStorage.removeItem(key);
  }
};