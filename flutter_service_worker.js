'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.json": "193463d0d54e6610dbb6f373a2c737eb",
"assets/AssetManifest.smcbin": "bf69c6e88fba2bd9a84276f62f037cc7",
"assets/assets/fonts/AveresTitleRoman-Regular.otf": "27897f53fe286343ac2f1642694e575b",
"assets/assets/fonts/ChromoxomePro-ExtraLight.otf": "54e30a034f045c08a4cc71418c038ce8",
"assets/assets/fonts/ChromoxomePro-ExtraLight.ttf": "d41db4cce5219d50ac2ef850af730dc0",
"assets/assets/fonts/iCielBCRostrum-Regular.otf": "09e6cfe27d170b95d20fb51bc55fb8fa",
"assets/assets/fonts/iCielBCSoven-Regular.ttf": "e02ad39b3c122aee07cbcd257c29797a",
"assets/assets/fonts/JournalSansNew-Display.otf": "4d3e839d48f9c00a40d7e2c9538c1cba",
"assets/assets/fonts/JournalSansNew-Italic.otf": "9a950aa483235d0ab3d06036f9901440",
"assets/assets/fonts/JustLovely-Roman.ttf": "9a7bab63f9903f1654c48ad98e7117c6",
"assets/assets/fonts/SVN-Amperzand.ttf": "c4cc30d9e00d475c4936981681991bb5",
"assets/assets/images/intro_0.jpg": "10fa44fd59ac20be795469ea35650be5",
"assets/assets/images/intro_1.jpg": "edd2441151050978d10ce26a51df8a05",
"assets/assets/images/intro_2.jpg": "e1cd5d94656e27fe112ee6955b4907c7",
"assets/assets/images/intro_3.jpg": "45771e3dfce493caaef9d8cb9de5e091",
"assets/assets/images/intro_4.jpg": "e6973204563c604f244ce44b99dfdd1f",
"assets/assets/images/intro_5.jpg": "6675eafa1aa0ebe86158b927695b6464",
"assets/assets/images/intro_6.jpg": "ff81293d9d9385fe19a274adcae93b38",
"assets/assets/images/page.jpg": "29d90807ca9e2babd9ec177b013dccc3",
"assets/assets/images/pinnacle_123.png": "b61a77034734ef06d831bb0e081d74a6",
"assets/assets/images/pinnacle_123.svg": "c079b908d0987a3d16d1e75552b642b2",
"assets/assets/images/pinnacle_456.png": "4c233caaa3c6036b0f35261d654c4b9b",
"assets/assets/images/pinnacle_456.svg": "5cf1d7a6097daf5253e5ddbfe35bf447",
"assets/assets/images/pinnacle_789.png": "61b808c4fdb0970b43c4b1e1275df955",
"assets/assets/images/pinnacle_789.svg": "453ada3ce87225d7e1bd6b19d9cf8920",
"assets/FontManifest.json": "c55bf24bbb76c992cfed82ba57d233a7",
"assets/fonts/MaterialIcons-Regular.otf": "369f3dca1873d01f3bbf66c7ff20a9c2",
"assets/lang/en.json": "bc8883285c86690df3a9f96f2b6a8abd",
"assets/lang/vi.json": "bc8883285c86690df3a9f96f2b6a8abd",
"assets/NOTICES": "a890e91dd5ed79d9f2f0dd081f223f3b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "0db203e8632f03baae0184700f3bda48",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "01bb14ae3f14c73ee03eed84f480ded9",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "efc6c90b58d765987f922c95c2031dd2",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"index.html": "3000a80a829f59b8fdac45533e125b60",
"/": "3000a80a829f59b8fdac45533e125b60",
"main.dart.js": "29bdc1792b056150b87d14cc799ebcdb",
"manifest.json": "56ef5909c85760fa8533c46b8023d4aa",
"version.json": "b292bb4b1d6dd2000f290cb0072b14ec"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
