import React, { Component, unstable_Suspense as Suspense } from "react";
import { render } from "react-dom";

function createResource(loadResource) {
  const resource = {
    read: function(cache, key) {
      return cache.read(resource, key, loadResource, key);
    },
    preload: function(cache, key) {
      return cache.preload(resource, key, loadResource, key);
    }
  };
  return resource;
}

function createCache() {
  const map = new Map();
  const cache = {
    read: (resourceType, key, miss, missArg) => {
      if (map.has(key)) return map.get(key);

      const suspended = miss(missArg).then(data => map.set(key, data));

      throw suspended;
    },
    preload: (resourceType, key, miss, missArg) => {
      miss(missArg).then(data => map.set(key, data));
    }
  };
  return cache;
}

const cache = createCache();

const sleep = (time, resolvedValue) =>
  new Promise(resolve => setTimeout(resolve, time, resolvedValue));

const sayHi = name => sleep(2000, `Hi ${name}! 👋`);

const hiResource = createResource(sayHi);

const Foo = () => {
  hiResource.preload(cache, "bar");
  const foo = hiResource.read(cache, "foo");
  const bar = hiResource.read(cache, "bar");
  return (
    <div>
      {foo} {bar}
    </div>
  );
};

function App() {
  return (
    <Suspense maxDuration={500} fallback="Loading...">
      <Foo />
    </Suspense>
  );
}

render(<App />, document.getElementById("root"));
