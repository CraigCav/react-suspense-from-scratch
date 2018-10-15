const sleep = (time, resolvedValue) =>
  new Promise(resolve => setTimeout(resolve, time, resolvedValue));

const sayHi = name => sleep(1000, `Hi ${name}! 👋`);

// app.js
function App() {
  return `Hi Suspense! 👋`;
}

import { createCache, createResource } from "react-cache";

const cache = createCache();

import React, { Component, unstable_Suspense as Suspense } from "react";

<Suspense maxDuration={0} fallback="Loading...">

function createCache() {
  const cache = {
    read: (resourceType, key, miss, missArg) => { },
    preload: (resourceType, key, miss, missArg) => { },
    '$$typeof': 0xcac4e // hex code indicates to React that this is a legit cache!
  };
  return cache;
}

function createResource(loadResource) {
  const resource = {
    read: function(cache, key) {},
    preload: function(cache, key) {}
  };
  return resource;
}

class Suspense extends Component {
  componentDidCatch(err, info) { }
  render() {}
}
  