import React, { Component, unstable_Suspense as Suspense } from "react";
import { render } from "react-dom";
import { createCache, createResource } from "react-cache";

const cache = createCache();

const sleep = (time, resolvedValue) =>
  new Promise(resolve => setTimeout(resolve, time, resolvedValue));

const sayHi = name => sleep(2000, `Hi ${name}! 👋`);

const hiResource = createResource(sayHi);

// class Foo extends Component {
//   constructor() {
//     super();
//     this.state = {};
//   }
//   componentDidMount() {
//     sayHi("foo").then(data => this.setState({ data }));
//   }
//   render() {
//     return <div>{this.state.data}</div>;
//   }
// }

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
    <Suspense maxDuration={1000} fallback="Loading...">
      <Foo />
    </Suspense>
  );
}

render(<App />, document.getElementById("root"));
