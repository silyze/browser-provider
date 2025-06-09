import { NullBrowserProvider } from "./null";
import { UrlBrowserProvider } from "./url";
import { BaseBrowserConfig, BrowserFactory, BrowserProvider } from "./provider";

export type ViewportConfig = {
  height: number;
  width: number;
  deviceScaleFactor?: number;
  isMobile?: boolean;
  isLandscape?: boolean;
  hasTouch?: boolean;
};

export type { BrowserFactory, BaseBrowserConfig };
export { BrowserProvider, NullBrowserProvider, UrlBrowserProvider };
