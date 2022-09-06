---
title: "Tutorial: Let's build a mushroom app!"
---

import ImageFrame from '@site/src/components/ImageFrame';

In this tutorial we will build an web app for finding and identifying mushrooms using p2panda. We will build the application with [React](https://reactjs.org/), [Webpack](https://webpack.js.org/) and [TypeScript](https://www.typescriptlang.org/).

:::note This is not a React tutorial

This tutorial assumes that you already have experience in using npm, React, Webpack and TypeScript. We want to rather focus on _using_ the JavaScript library `p2panda-js`. That being said, if you are a beginner in web development, this is also for you as most of the code has already been written!

:::

The idea of the application is inspired by [PlantNet](https://plantnet.org): Users can create entries of different mushrooms to create some sort of community-run encyclopedia. If you're around in the forest you can take a picture of a spotted mushroom, give it a GPS position and mark it with the mushroom database entry you _think_ it might be. You can even select multiple mushrooms if you are not sure. The uploaded pictures of all users will show up in some sort of feed.

<ImageFrame
  title="This is how the app looks like"
  url={require('./assets/mushroom-app.png')}
/>

Of course this is a very simple mushrooming app and we can think of many cool features already now: Like users giving comments on your findings, rating them and even giving suggestions / votes which mushroom it can be - or you could show a world map of all mushroom findings with the help of the GPS positions. Or you can delete findings if they are wrong! All of this is possible with p2panda, you can hack on it if you want after reading this tutorial.

:::tip Visual identification of mushrooms

All cool polar mushroom animals know that it is not always possible to identify mushrooms based on pictures. There are many other factors as well: The smell, the color of the spores, the surrounding, time of the year, change of color after rain and more! Sometimes you even need a microscope to see the spores - to really be sure.

:::

## What do I need?

* NodeJS
* Rust
* Editor
* Terminal
* Browser

:::info Never worked with Rust before?

This tutorial requires you to have a working Rust environment. If you have never worked with Rust before this is no problem! Setting it up is fairly easy and besides using some basic command line commands there is no more Rust knowledge required to make `aquadoggo` and `send-to-node` run on your computer.

:::

<details><summary>How do I install Rust?</summary>

Make sure you have a working Rust environment installed on your computer before you begin with the tutorial. You can check this by running `rustc --version` in your terminal. This tutorial was written with Rust version `1.63.0` but it will probably also work with other versions.

If you don't have Rust installed yet you can follow the steps on the official Rust website: [How to install Rust](https://www.rust-lang.org/tools/install).

</details>

<details><summary>How do I install NodeJS?</summary>

You can check out the official [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/) guidelines here. But we would recommend you installing a NodeJS version manager like [nvm](https://github.com/nvm-sh/nvm), or even better [n](https://github.com/tj/n). We used NodeJS version `18.8.0` for this tutorial.

</details>
