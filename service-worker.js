/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts(
<<<<<<< HEAD:service-worker.js
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'
=======
  "/precache-manifest.4948f1e9c5e0a9521662a52080445a6d.js"
>>>>>>> 6cd55fb67c5efcac189fc97db5fac271e4f0a6aa:build/service-worker.js
);

importScripts('/precache-manifest.7dd42ac6b3c5b853bf2220c53e633f1f.js');

workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute('/index.html', {
  blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
});
