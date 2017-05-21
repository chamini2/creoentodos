var CACHE = 'network-or-cache';

var INDEX = [
  './index.html',
  './index.css',
  './index.js',
];

var I = [
  './i/index.html',
  './i/index.js',
];

var II = [
  './ii/index.html',
  './ii/index.js',
];

var III = [
  './iii/index.html',
  './iii/index.js',
];

var IV = [
  './iv/index.html',
  './iv/index.css',
  './iv/index.js',
];

var V = [
  './v/index.html',
  './v/index.css',
  './v/index.js',
];

var VI = [
  './vi/index.html',
  './vi/index.css',
  './vi/index.js',
];

var NO = [
  './no/index.html',
  './no/index.css',
  './no/index.js',
];

var WORDSEARCH = [
  './wordsearch/index.css',
  './wordsearch/index.js',
];

// On install, cache some resources.
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');

  // Ask the service worker to keep installing until the returning promise
  // resolves.
  evt.waitUntil(precache());
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  // You can use `respondWith()` to answer immediately, without waiting for the
  // network response to reach the service worker...
  evt.respondWith(fromCache(evt.request));
  // ...and `waitUntil()` to prevent the worker from being killed until the
  // cache is updated.
  evt.waitUntil(update(evt.request));
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([].concat(
      INDEX, I, II, III, IV, V, VI, NO, WORDSEARCH
    ));
  });
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
