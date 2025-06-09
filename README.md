# Browser Provider

A flexible abstraction for managing Puppeteer browser connections.

This library provides a consistent interface (`BrowserProvider`) for working with remote or mock Puppeteer-compatible browser instances. It is particularly useful when you want to separate browser connection logic from business logic, or support different environments (e.g. mock/testing vs production).

## Install

```bash
npm install @silyze/browser-provider
```

## Overview

`@silyze/browser-provider` helps decouple browser acquisition and lifecycle management from how you use the browser. Instead of hardcoding browser connection logic in your application, you can rely on a `BrowserProvider` implementation.

This makes it easy to:

- Swap real browsers with mocks for testing
- Connect to remote browsers (e.g. via Chrome DevTools Protocol)
- Centralize browser connection logic across your app

## Exports

```ts
import {
  BrowserProvider,
  UrlBrowserProvider,
  NullBrowserProvider,
  type BrowserFactory,
  type BaseBrowserConfig,
  type ViewportConfig,
} from "@silyze/browser-provider";
```

## Usage

```ts
import { BrowserProvider, UrlBrowserProvider } from "@silyze/browser-provider";

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
```

## Providers

### `BrowserProvider`

Abstract base class for all providers.

Implementations must define:

```ts
abstract getBrowser(config?: TConfig): Promise<Browser> | Browser;
abstract releaseBrowser(browser: Browser): Promise<void> | void;
```

### `UrlBrowserProvider`

Connects to a remote browser via a URL (e.g. from a `puppeteer-core` compatible remote endpoint).

```ts
const provider = new UrlBrowserProvider({}, "http://localhost:9222/");
const browser = await provider.getBrowser();
```

### `NullBrowserProvider`

A no-op provider useful for disabling browser behavior in some environments (e.g. local development or unit tests).

```ts
const browser = NullBrowserProvider.default.getBrowser(); // returns null
```

## Advanced: Custom Connection Factory

You can customize how remote browsers are connected using a `factory` function:

```ts
import puppeteer from "puppeteer-core";

const factory = async (url: string) => {
  return await puppeteer.connect({ browserURL: url });
};

const provider = new UrlBrowserProvider(
  { factory },
  "http://my-remote-host:9222/"
);
```
