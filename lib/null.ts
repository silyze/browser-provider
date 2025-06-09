import type { Browser } from "puppeteer-core";
import { BrowserProvider } from "./provider";

export class NullBrowserProvider extends BrowserProvider {
  static default = new NullBrowserProvider({});

  public getBrowser(): Promise<Browser> | Browser {
    return null!;
  }
  public releaseBrowser(): Promise<void> | void {
    return null!;
  }
}
