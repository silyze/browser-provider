import { BrowserProvider, UrlBrowserProvider } from "./lib";

async function goToUrl(url: string, provider: BrowserProvider) {
  const browser = await provider.getBrowser();

  const [page] = await browser.pages();

  await page.goto(url);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await provider.releaseBrowser(browser);
}

goToUrl(
  "https://example.com",
  new UrlBrowserProvider({}, "http://localhost:9222/")
);
