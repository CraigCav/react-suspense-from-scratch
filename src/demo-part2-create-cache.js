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
    },
    $$typeof: 0xcac4e // hex code indicates to React that this is a legit cache!
  };
  return cache;
}
