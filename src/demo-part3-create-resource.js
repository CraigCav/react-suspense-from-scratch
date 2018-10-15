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
