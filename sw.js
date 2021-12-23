// Let's use the local version of Workbox instead of CDN
import * as googleAnalytics from "workbox-google-analytics";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import * as strategies from "workbox-strategies";
import { skipWaiting, clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";

googleAnalytics.initialize();

// SETTINGS

// Modify SW update cycle
skipWaiting();
clientsClaim();

// PRECACHING

// We inject manifest here using "workbox-build" in workbox-build-inject.js
precacheAndRoute([{"revision":"cf989e0070f37566c5954c930218589e","url":"404.html"},{"revision":"fe02e7d9d70a5f717a7b4f0a307dc270","url":"blog/get-ready-for-2020/index.html"},{"revision":"2547bae3bd1c6c83effbd57da4d33389","url":"blog/index.html"},{"revision":"ac5dd1a59aa4916a0ee8aa7621798cbb","url":"code-of-conduct/index.html"},{"revision":"0eba68b0f66949959ea8c7fe129c97eb","url":"faq/index.html"},{"revision":"1f1c95bceb7502f7d52f76ba14f1a71d","url":"index.html"},{"revision":"a51e9767dbcc2709e41f66cd9fd8fa31","url":"partners/communities/gdg_bergen/index.html"},{"revision":"e0599ec786d462c850070113e02f2233","url":"partners/communities/gdg_cloud_oslo/index.html"},{"revision":"35feaf4a5d3a9d877d3eb39d753d113b","url":"partners/communities/gdg_oslo/index.html"},{"revision":"df31a602cf8ab913c1429ec55cec078e","url":"partners/communities/gdg_sorlandet/index.html"},{"revision":"3d9a921e5ce65103d0188efafdcc9794","url":"partners/communities/gdg_stavanger/index.html"},{"revision":"6af90235cbe42bc28c3fdae1fc529ba9","url":"partners/communities/gdg_trondheim/index.html"},{"revision":"1ad1a7e3905e13c23293c6120cce1368","url":"partners/index.html"},{"revision":"735de18ce1d482e0e386edc70285ed44","url":"partners/organizers/gdg_bergen/index.html"},{"revision":"c02faa4ba44cbcec3d83f4bb0b22351b","url":"partners/organizers/gdg_cloud_oslo/index.html"},{"revision":"8931e8822963aeca36249805a0d2e310","url":"partners/organizers/gdg_oslo/index.html"},{"revision":"b68f9fbdb6d03f28ef8da76bcc8cbb5e","url":"partners/organizers/gdg_sorlandet/index.html"},{"revision":"dfb8ae67679a34bb9d35e95dcdeefe2b","url":"partners/organizers/gdg_stavanger/index.html"},{"revision":"b9abd82f64e4d202d63a1f38406f6e86","url":"partners/organizers/gdg_trondheim/index.html"},{"revision":"ae297f39cf9516919f1d3d17bd1560f8","url":"partners/sponsors/google/index.html"},{"revision":"a507649242563b217917449bcc90a81b","url":"schedule/index.html"},{"revision":"9e86308f5900220d243ff83a5c320ec5","url":"sessions/__break/index.html"},{"revision":"53895b8b959a87caa4ea948ed4919064","url":"sessions/__close/index.html"},{"revision":"2c350c8b82da2ea5a73a9a0794015e5a","url":"sessions/__hero/index.html"},{"revision":"1907ffbea840ee9a0f72885d185847bc","url":"sessions/__open/index.html"},{"revision":"5e86952da86f0fa38ad1c440ecf423ec","url":"sessions/__quiz/index.html"},{"revision":"5129a07d0b314b74021b8ef80c50c9f6","url":"sessions/angular_material_design/index.html"},{"revision":"5ad90ec2e4513a0d2c020f7715149330","url":"sessions/beyond_es6/index.html"},{"revision":"8ceaebfb67579545c378376c5cd069e8","url":"sessions/directives_in_angular/index.html"},{"revision":"a122e82acd44dedc9745390b425f2264","url":"sessions/fair_ml_models/index.html"},{"revision":"907c322fc0dbd764eac02a6ab91318b2","url":"sessions/famous_app_uis_in_flutter/index.html"},{"revision":"ac53680e2de207168cd7a605a12b5adf","url":"sessions/flutter_ecosystem/index.html"},{"revision":"c58adb6fdce8a55c568905b0e164b5de","url":"sessions/index.html"},{"revision":"0b1d292d7cfe52ef6fe4d0300b316ba9","url":"sessions/istio/index.html"},{"revision":"ad2f371d8b4bf8c18ba38ed3af8cf2c3","url":"sessions/make_flutter_secure/index.html"},{"revision":"fb285c22c6144325e68a37926a8537ab","url":"sessions/memory_leaking/index.html"},{"revision":"00b4edc01113634c4e3ca0a85e3cc816","url":"sessions/ml_using_tensorflow_lite/index.html"},{"revision":"aa4b5a888e741d6ccbb2d7032d7dc18d","url":"sessions/mobile_devops/index.html"},{"revision":"955d288f4b0e0acd83be06c5884c4905","url":"sessions/multiplatform_triatholin_in_kotlin/index.html"},{"revision":"a5f5e5abf6c1ce63b0721f5d42c9183c","url":"sessions/no_way_jose/index.html"},{"revision":"c2c27fb0befe985e38dfbdc1f6531818","url":"sessions/robots/index.html"},{"revision":"8ae670017d4b4e0b52697075ebc4ca28","url":"sessions/serverless_on_cloudrun/index.html"},{"revision":"c7de6a7382e63614f9ab64d29e144bc6","url":"sessions/vue3/index.html"},{"revision":"ab9963e672a435edbce99008d0ccdd10","url":"sessions/want_more_from_your_frontend/index.html"},{"revision":"4032febee0892c1e7c9f5eb78a386f4e","url":"speakers/ashita_prasad/index.html"},{"revision":"5d431028174905f7f1d2adac3c457cb7","url":"speakers/carlos_mota/index.html"},{"revision":"cb5ae894e71fcf28bdf8fe34c528c4b4","url":"speakers/charmi_chokshi/index.html"},{"revision":"a8e16900ed519f219d468542b394543c","url":"speakers/dharmesh_vaya/index.html"},{"revision":"a7dc9ab36cd690e5353e45c8176ae6e4","url":"speakers/emma_twersky/index.html"},{"revision":"92bc7725a0ea9b8ebf113346e5c1356b","url":"speakers/gaute_meek_olsen/index.html"},{"revision":"2c8261727c544d1901eaef9b264aa70b","url":"speakers/gil_fink/index.html"},{"revision":"1299a2091399b59f6628070772b4bb3b","url":"speakers/hakon_silfvernagel/index.html"},{"revision":"1bfb0e5ee5e1c1c2bd8b1c3ce12bc30c","url":"speakers/index.html"},{"revision":"27c4e09d059f69660641b8ddb99d431d","url":"speakers/jakub_holy/index.html"},{"revision":"a5d30574393b4d30e7a48e62435930ef","url":"speakers/kevin_davin/index.html"},{"revision":"9e0a0e8aa3f37ff6d22e0c6174cd0ad2","url":"speakers/nicola_corti/index.html"},{"revision":"8f4d7c4c9e977199ab8b88ddd90a9c37","url":"speakers/nivetha_maran/index.html"},{"revision":"9bfefb402ceff4115ba72e3644d720f1","url":"speakers/sakina_abbas/index.html"},{"revision":"afce9101a2bc7cc5d54642a6afb3cee7","url":"speakers/sam_bellen/index.html"},{"revision":"8bbe23194e8a61c5547b6356b84d5bdf","url":"speakers/selin_ornek/index.html"},{"revision":"1744f90455ea59d6c5ec7ecf99618dca","url":"speakers/sharmistha_chatterjee/index.html"},{"revision":"fc47b1fcc38c1f0cd51b1a7950515f4a","url":"speakers/waleed_arshad/index.html"},{"revision":"7fc6fb1f2f13a2dadd4d9a19afc737e3","url":"tags/_ai/index.html"},{"revision":"696c9f6f147c36c99a1e11047dfb4354","url":"tags/_backend/index.html"},{"revision":"7967547e23dd5a73ff78714180432020","url":"tags/_mobile/index.html"},{"revision":"987c224519f9ae991e0cc2b650f06393","url":"tags/_web/index.html"},{"revision":"e3e94b1de51b8aa6077cfbce8b9c93e5","url":"tags/break/index.html"},{"revision":"0ed2cf5f662713c30af7d2f54d433f50","url":"tags/close/index.html"},{"revision":"925a3e39f04572340ca5d0547f4283ec","url":"tags/hero/index.html"},{"revision":"dd758b7c730cf3e4b816d0776df5fd46","url":"tags/index.html"},{"revision":"288aececeadf878ab75d23e9ef7494d0","url":"tags/open/index.html"},{"revision":"a6c47a19fd88bfa744293d30a51f61ad","url":"tags/quiz/index.html"},{"revision":"1b2c9ed3768f323b8479043f5399e790","url":"team/index.html"},{"revision":"3fb59ed24867a8dcb39ae6b7776de9ad","url":"styles/blog-page.css"},{"revision":"b12c09a3800e95d1c41cab553c23bedb","url":"styles/blog-section.css"},{"revision":"ec32dd200935668f292c3e2c7760ea99","url":"styles/home.css"},{"revision":"ec32dd200935668f292c3e2c7760ea99","url":"styles/page-home.css"},{"revision":"5c45f5cd8fd863e55a4d85da325fa920","url":"styles/page-page.css"},{"revision":"5c45f5cd8fd863e55a4d85da325fa920","url":"styles/page.css"},{"revision":"e3b5b458f160f82745495f82b12565db","url":"styles/partners-page.css"},{"revision":"d2111b68db2eb76c7dcfc9f2078e6c60","url":"styles/partners-section.css"},{"revision":"8bd826f6eb14b82c0772941c7aab8302","url":"styles/schedule-section.css"},{"revision":"0c53ce922a1df4690b7ca8419c912a11","url":"styles/sessions-page.css"},{"revision":"924faa5cf127788f1b3754efc6d39b7e","url":"styles/sessions-section.css"},{"revision":"4096a013ff01135a96d5c4d740188815","url":"styles/speakers-page.css"},{"revision":"8b110a41ff5c9838ae1b2edca6aa59bb","url":"styles/speakers-section.css"},{"revision":"d41a0cc2f9b8521db470598106c77504","url":"styles/team-section.css"},{"revision":"444364ee27394f6378b27b2d030b62de","url":"images/logos/logo.png"},{"revision":"9316b30cb573d30f11e10e9458f56942","url":"manifest/icon-72.png"},{"revision":"700237af96cc92ad5c99a4683750239a","url":"manifest/icon-large.png"},{"revision":"327414c23ea5d7737b9b0e2b12b0ae5b","url":"favicon.ico"},{"revision":"65ded980651e608a6bb4ea76ab5f1b74","url":"icons.svg"},{"revision":"e987cfbb3395532e02a036462e5105c7","url":"main.js"},{"revision":"925b1cfb3ff415d8a781c0a026a8f096","url":"modernizr-webp.js"},{"revision":"4096931795e0179a8fc0fd413b63ec53","url":"service-worker.js"},{"revision":"d9d8983feecdafc2ffead31d18dc0934","url":"sw-noop.js"},{"revision":"e987cfbb3395532e02a036462e5105c7","url":"theme.js"},{"revision":"a11e27ed15bcc43e5ebf6220bf0ebf33","url":"social-share.png"}], {
  urlManipulation: ({ url }) => {
    //console.log(url);
    return [url];
  },
  ignoreURLParametersMatching: [/.*/],
});

// RUNTIME CACHING

// Images
registerRoute(
  // /.*\.(?:png|jpg|webp|svg|gif)/,
  ({request}) => request.destination === 'image',
  new strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        purgeOnQuotaError: true,
      }),
    ],
  })
);

// Google fonts
registerRoute(
  new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
  new strategies.StaleWhileRevalidate({
    cacheName: "googleapis",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
      }),
    ],
  })
);

// PUSH NOTIFICATIONS

// Receive push and show a notification
self.addEventListener("push", function (event) {
  console.log("[Service Worker]: Received push event", event);

  var notificationData = {};

  if (event.data.json()) {
    notificationData = event.data.json().notification;
  } else {
    notificationData = {
      title: "Something Has Happened",
      message: "Something you might want to check out",
      icon: "/assets/images/logo.png",
    };
  }

  self.registration.showNotification(notificationData.title, notificationData);
});

// Custom notification actions
self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker]: Received notificationclick event");

  event.notification.close();

  if (event.action == "opentweet") {
    console.log("[Service Worker]: Performing action opentweet");

    event.waitUntil(
      clients.openWindow(event.notification.data).then(function (windowClient) {
        // do something with the windowClient.
      })
    );
  } else {
    console.log("[Service Worker]: Performing default click action");

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(
      clients
        .matchAll({
          includeUncontrolled: true,
          type: "window",
        })
        .then(function (clientList) {
          for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == "/" && "focus" in client) return client.focus();
          }
          if (clients.openWindow) return clients.openWindow("/");
        })
    );
  }
});

// Closing notification action
self.addEventListener("notificationclose", function (event) {
  log("[Service Worker]: Received notificationclose event");
});
