import type { Browser } from "puppeteer-core";
import puppeteer from "puppeteer-core";

export type BrowserFactory = (remoteUrl: string) => Promise<Browser>;

export type BaseBrowserConfig = { factory?: BrowserFactory };

export abstract class BrowserProvider<TConfig = {}> {
  #config: BaseBrowserConfig;
  public constructor(config: BaseBrowserConfig) {
    this.#config = config;
  }

  public abstract getBrowser(config?: TConfig): Promise<Browser> | Browser;

  public abstract releaseBrowser(browser: Browser): Promise<void> | void;

  protected async fromFactory(url: string | URL) {
    const remoteUrl = url.toString();

    if (this.#config.factory) {
      return await this.#config.factory(remoteUrl);
    }

    return await puppeteer.connect({
      browserURL: remoteUrl,
    });
  }
}
