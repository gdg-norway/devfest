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
precacheAndRoute([{"revision":"11feb7fc7af1ae6d5f2075a20dea56a8","url":"404.html"},{"revision":"b08ee6b5aeb5bcaf8f783a2dfd9eb9e3","url":"blog/get-ready-for-2020/index.html"},{"revision":"00ccd35d17cdfab3a76b294d7f805adf","url":"blog/index.html"},{"revision":"398eccc83bb8a3963404ab0f4d326562","url":"code-of-conduct/index.html"},{"revision":"c193b7a209641b3567014a17baf8c943","url":"faq/index.html"},{"revision":"dd401de1b685945a1283cf367e67657f","url":"index.html"},{"revision":"f48605af92a1ca45b834543b84f8e2cf","url":"partners/communities/gdg_bergen/index.html"},{"revision":"604a866842bcd6a904b2b6d5ed80b9c8","url":"partners/communities/gdg_cloud_oslo/index.html"},{"revision":"7a725cd5f2b89b08a1d43b5cb0b99fd5","url":"partners/communities/gdg_oslo/index.html"},{"revision":"6ee8cac59acaa220abc221f84726d48c","url":"partners/communities/gdg_sorlandet/index.html"},{"revision":"930508e1e6f14e00a3ff5630abad7bb1","url":"partners/communities/gdg_stavanger/index.html"},{"revision":"7dfd9058b3340f8a487bbb0d434895f5","url":"partners/communities/gdg_trondheim/index.html"},{"revision":"b48cdf478b6f63de8d5997e2abdbb801","url":"partners/index.html"},{"revision":"d97be5fffa0497eb492b8360df78b775","url":"partners/organizers/gdg_bergen/index.html"},{"revision":"0e71f2895949af39dd27654fd3132a78","url":"partners/organizers/gdg_cloud_oslo/index.html"},{"revision":"17ddcb410b6169d6ebb9c89d1858e569","url":"partners/organizers/gdg_oslo/index.html"},{"revision":"a2607e8d5e5feb422add91da5b60c80f","url":"partners/organizers/gdg_sorlandet/index.html"},{"revision":"593d14848d5d527c353414a4322d2ce7","url":"partners/organizers/gdg_stavanger/index.html"},{"revision":"2c95bb6e0db2b815061e62d3a49e3f78","url":"partners/organizers/gdg_trondheim/index.html"},{"revision":"d09396fa3727629394d51e8069aef9c8","url":"partners/sponsors/google/index.html"},{"revision":"785de80e937f84fc70466415d6159e0a","url":"schedule/index.html"},{"revision":"8834d32ae6c0999346420e17e0f1586a","url":"sessions/__break/index.html"},{"revision":"2f026be546ad1e215bcfcfd48e5d2682","url":"sessions/__close/index.html"},{"revision":"364bb7117c46f5120d536415461d3755","url":"sessions/__hero/index.html"},{"revision":"667ed28eb4cbcb964a6dec4a01955e60","url":"sessions/__open/index.html"},{"revision":"5f694a0b5ff3aad67e1c77d78db32584","url":"sessions/__quiz/index.html"},{"revision":"1f18964697706582f37e10aa3f8daaba","url":"sessions/angular_material_design/index.html"},{"revision":"5ab628ff2f777c11eb4dbc8e24c149de","url":"sessions/beyond_es6/index.html"},{"revision":"6414d5d794ab50956e6b8f79ca335605","url":"sessions/directives_in_angular/index.html"},{"revision":"284626c92875256ecc8d682a24946cec","url":"sessions/fair_ml_models/index.html"},{"revision":"64e9ac3fef7a67898a34d9ee4641771a","url":"sessions/famous_app_uis_in_flutter/index.html"},{"revision":"b1ee502d41d059a6087779d1c0163dc0","url":"sessions/flutter_ecosystem/index.html"},{"revision":"e3128818ed38e698337a42cbe5c93bf4","url":"sessions/index.html"},{"revision":"c1dc1e47c590e065ac87fee75c19b890","url":"sessions/istio/index.html"},{"revision":"a0ab998a55b247102e2b620b978c2b13","url":"sessions/make_flutter_secure/index.html"},{"revision":"ab42ea0ea8b088f46aa9b0a5539a39eb","url":"sessions/memory_leaking/index.html"},{"revision":"e30cf7cce96436b2576cc1c9be1928e1","url":"sessions/ml_using_tensorflow_lite/index.html"},{"revision":"a36de3f4968270391dd6907a96616475","url":"sessions/mobile_devops/index.html"},{"revision":"296a1f36764310de65f97068c66acb61","url":"sessions/multiplatform_triatholin_in_kotlin/index.html"},{"revision":"a48add570f9560333578b971975eb8a2","url":"sessions/no_way_jose/index.html"},{"revision":"efc7425e939ef7ebe31728cd9866e43a","url":"sessions/robots/index.html"},{"revision":"a48f29c27e47aaf48a613237b670674c","url":"sessions/serverless_on_cloudrun/index.html"},{"revision":"550b036c17d091fc02a542fafe7942bc","url":"sessions/vue3/index.html"},{"revision":"7d444db7a42e6aaab2bd9dd9b901236f","url":"sessions/want_more_from_your_frontend/index.html"},{"revision":"84b4657fd390f086ab104b9132e5db52","url":"speakers/ashita_prasad/index.html"},{"revision":"eeaffd0c83674d76f79e4c7841838421","url":"speakers/carlos_mota/index.html"},{"revision":"f4df1b522aeef3d7154f38a85811faf7","url":"speakers/charmi_chokshi/index.html"},{"revision":"83ade5098cee68cf52be66b8ebf5890b","url":"speakers/dharmesh_vaya/index.html"},{"revision":"1791195c57eac8ddddc24f2c5b3f17c2","url":"speakers/emma_twersky/index.html"},{"revision":"c78320d8bdf700fa6e76364d1552c8ec","url":"speakers/gaute_meek_olsen/index.html"},{"revision":"2f970016b4158c3143252f5f3e7fe726","url":"speakers/gil_fink/index.html"},{"revision":"b2ced8a3a8c84951e7418efb14cb645a","url":"speakers/hakon_silfvernagel/index.html"},{"revision":"7e49fc79170a011d5702d3c034e29781","url":"speakers/index.html"},{"revision":"6bebceaa63650dcc7d96ea28b95ae7c5","url":"speakers/jakub_holy/index.html"},{"revision":"74fc950ee537320953eccd30eef6140f","url":"speakers/kevin_davin/index.html"},{"revision":"339abddff523fdb20c3946cf0f36142d","url":"speakers/nicola_corti/index.html"},{"revision":"d025c9a1b234e236325a2c96174b8978","url":"speakers/nivetha_maran/index.html"},{"revision":"34d661bb1a28ed98e69e3a16bbe5dd81","url":"speakers/sakina_abbas/index.html"},{"revision":"b2016d330447c5b4ba999eea137e2153","url":"speakers/sam_bellen/index.html"},{"revision":"401acac156ca5537c0ef3a0dbca7a41b","url":"speakers/selin_ornek/index.html"},{"revision":"9c20f8b2019d30d1dbcc20ed0a260261","url":"speakers/sharmistha_chatterjee/index.html"},{"revision":"2ba567178f16d12e3d3a84b6b14d87d2","url":"speakers/waleed_arshad/index.html"},{"revision":"caa22a38f714ba2b7896a8c82b94e9e2","url":"tags/_ai/index.html"},{"revision":"8ec555d26c36f708bf83f47127fa8fd6","url":"tags/_backend/index.html"},{"revision":"87d9cf48e734953632b27ce68b440992","url":"tags/_mobile/index.html"},{"revision":"4ecb1acbaae0fc4c73966069e6f555af","url":"tags/_web/index.html"},{"revision":"6a9d23f2cd175e6f6155f6cd6a6d55ad","url":"tags/break/index.html"},{"revision":"11a3bed01955a26dd557786750b7f569","url":"tags/close/index.html"},{"revision":"bf3907225e03b2717dcc3ca6a5de8692","url":"tags/hero/index.html"},{"revision":"a1ca27f2aeabe473cc0ea3846d5eb908","url":"tags/index.html"},{"revision":"cb7b6f9cfe2787c79cea77df7cdf6e67","url":"tags/open/index.html"},{"revision":"ab529beeb99b1c645cb0c9680601b894","url":"tags/quiz/index.html"},{"revision":"b29c0e597728190f9c1de1b1c4a936d4","url":"team/index.html"},{"revision":"3fb59ed24867a8dcb39ae6b7776de9ad","url":"styles/blog-page.css"},{"revision":"b12c09a3800e95d1c41cab553c23bedb","url":"styles/blog-section.css"},{"revision":"ec32dd200935668f292c3e2c7760ea99","url":"styles/home.css"},{"revision":"ec32dd200935668f292c3e2c7760ea99","url":"styles/page-home.css"},{"revision":"5c45f5cd8fd863e55a4d85da325fa920","url":"styles/page-page.css"},{"revision":"5c45f5cd8fd863e55a4d85da325fa920","url":"styles/page.css"},{"revision":"e3b5b458f160f82745495f82b12565db","url":"styles/partners-page.css"},{"revision":"d2111b68db2eb76c7dcfc9f2078e6c60","url":"styles/partners-section.css"},{"revision":"8bd826f6eb14b82c0772941c7aab8302","url":"styles/schedule-section.css"},{"revision":"0c53ce922a1df4690b7ca8419c912a11","url":"styles/sessions-page.css"},{"revision":"924faa5cf127788f1b3754efc6d39b7e","url":"styles/sessions-section.css"},{"revision":"4096a013ff01135a96d5c4d740188815","url":"styles/speakers-page.css"},{"revision":"8b110a41ff5c9838ae1b2edca6aa59bb","url":"styles/speakers-section.css"},{"revision":"d41a0cc2f9b8521db470598106c77504","url":"styles/team-section.css"},{"revision":"444364ee27394f6378b27b2d030b62de","url":"images/logos/logo.png"},{"revision":"9316b30cb573d30f11e10e9458f56942","url":"manifest/icon-72.png"},{"revision":"700237af96cc92ad5c99a4683750239a","url":"manifest/icon-large.png"},{"revision":"327414c23ea5d7737b9b0e2b12b0ae5b","url":"favicon.ico"},{"revision":"65ded980651e608a6bb4ea76ab5f1b74","url":"icons.svg"},{"revision":"e987cfbb3395532e02a036462e5105c7","url":"main.js"},{"revision":"925b1cfb3ff415d8a781c0a026a8f096","url":"modernizr-webp.js"},{"revision":"4096931795e0179a8fc0fd413b63ec53","url":"service-worker.js"},{"revision":"d9d8983feecdafc2ffead31d18dc0934","url":"sw-noop.js"},{"revision":"e987cfbb3395532e02a036462e5105c7","url":"theme.js"},{"revision":"a11e27ed15bcc43e5ebf6220bf0ebf33","url":"social-share.png"}], {
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
