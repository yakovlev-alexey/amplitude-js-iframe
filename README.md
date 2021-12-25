# Amplitude JS SDK Iframe Client

A tiny-ish package to perform cross-domain communication between a website and an `iframe` with [Amplitude JS SDK](https://developers.amplitude.com/docs/javascript).

Check out a basic demo [here](https://yakovlev-alexey.github.io/amplitude-js-iframe/).

![](https://img.shields.io/bundlephobia/minzip/amplitude-js-iframe?style=social)

## Table of Contents

-   [Amplitude JS SDK Iframe Client](#amplitude-js-sdk-iframe-client)
-   [Table of Contents](#table-of-contents)
-   [Motivation](#motivation)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Contributing](#contributing)
-   [License](#license)

## Motivation

You might be wondering - why would someone have to use Amplitude SDK through an `iframe`? The answer is simple - security policies. Some organizations require their websites to not execute arbitary code capable of tracking users and making requests (despite this code being certified). But as a business you might benefit from using a tool like Amplitude, so as a compromise arbitary code is executed on a different cookie-less domain which doesn't violate security policies.

Currently only the most basic functionality is available: initializing multiple projects in the same or multiple `iframe`s, associating users by id and setting their properties. `Identify` and `Revenue` functionality is not supported at the moment.

> `setUserProperties` should cover every need to interact with `Identify` since it's just a shortcut for it.

## Installation

You can install `amplitude-js-iframe` using npm or yarn:

```bash
npm i amplitude-js-iframe --save
# or
yarn add amplitude-js-iframe
```

But that's not all: to properly communcate you also need an `iframe`. [See HTML file](/iframe/index.html) for a possible implementation. Or just embed the code from [`script.js`](/iframe/script.js) after [SDK snippet](https://developers.amplitude.com/docs/javascript#installing-via-the-snippet) in your own document.

## Usage

See an example in the [demo](https://yakovlev-alexey.github.io/amplitude-js-iframe/) or discover example code yourself at [`gh-pages` branch](https://github.com/yakovlev-alexey/amplitude-js-iframe/tree/gh-pages).

This package exports `AmplitudeIframeClient` class which *mostly* duplicates parts of the interface from `Amplitude` class from JS SDK with primary difference being the absence of callbacks.

For example, you may get an instance of the client using `getInstance` static method:

```js
import { AmplitudeIframeClient } from "amplitude-js-iframe";

AmplitudeIframeClient.getInstance("instance_name")
// or use the default instance
AmplitudeIframeClient.getInstance()
```

After creating an instance you should initialize it using `init` function. The notable difference from SDK here is that it takes another parameter in front: a `MessagePort` to communcate with an `iframe`. Why a `MessagePort` you might ask - in order to allow communicating not only with `iframe`s, but also with `ServiceWorker`s and NodeJS `MessagePort`. In order to help you get the desired `iframe` this package also exports a helper method `getIframeMessagePort`.

```js
import {
  AmplitudeIframeClient,
  getIframeMessagePort,
} from "amplitude-js-iframe";

// pass iframe selector as the argument
const iframeMp = await getIframeMessagePort("#iframe");
AmplitudeIframeClient.getInstance().init(
  iframeMp,
  "<API_KEY_HERE>"
  // optionally specify other parameters
);
```

From this point you may start sending events, assigning user properties and ID.

```js
import { AmplitudeIframeClient } from "amplitude-js-iframe";

AmplitudeIframeClient.getInstance().logEvent("test", {
  hello: "world",
  quick: ["brown", "fox"],
});

AmplitudeIframeClient.getInstance().setUserId("123");

AmplitudeIframeClient.getInstance().setUserProperties({ role: "anon" });
```

## Contributing

Feel free to send any suggestions in [GitHub issues](https://github.com/yakovlev-alexey/amplitude-js-iframe/issues) or open a Pull Request with your feature.

## License

[MIT](/LICENSE)


