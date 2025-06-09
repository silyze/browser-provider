import type { Browser } from "puppeteer-core";
import { BaseBrowserConfig, BrowserProvider } from "./provider";

export class UrlBrowserProvider extends BrowserProvider<URL | string> {
  #defaultUrl: string | URL;

  constructor(
    config: BaseBrowserConfig = {},
    defaultUrl: URL | string = "http://localhost:9222/"
  ) {
    super(config);
    this.#defaultUrl = defaultUrl;
  }

  public async getBrowser(url?: URL | string): Promise<Browser> {
    return this.fromFactory(url ?? this.#defaultUrl);
  }

  public releaseBrowser(browser: Browser): Promise<void> | void {
    if (browser.connected) {
      browser.disconnect();
    }
  }
}
