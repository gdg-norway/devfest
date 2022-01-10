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
precacheAndRoute([{"revision":"19b6035815c9d1c83395b3b30a681a7c","url":"404.html"},{"revision":"86c0db4d3d69d34f4dec1c4f1b8454be","url":"blog/get-ready-for-2020/index.html"},{"revision":"7342b20638c99051211a1b2b3e082ba5","url":"blog/index.html"},{"revision":"5a69ed326c2451dfcda3c448ca6fcd3e","url":"code-of-conduct/index.html"},{"revision":"1020fc51db2945d0bc36161faa6dc342","url":"faq/index.html"},{"revision":"14d04bd550147cea4f188f959d869df2","url":"index.html"},{"revision":"cfc8725e6b3bf35da824d71a275696fd","url":"partners/communities/gdg_bergen/index.html"},{"revision":"fe4113bf2f0c6e65e4d9c3d845124c40","url":"partners/communities/gdg_cloud_oslo/index.html"},{"revision":"6494babae280dbaca40e8d28d671dea0","url":"partners/communities/gdg_oslo/index.html"},{"revision":"22f6a61d83f15b9195e8deb3ea8c62f5","url":"partners/communities/gdg_sorlandet/index.html"},{"revision":"cb6c956a0e1cf22f1eb380cd0864b882","url":"partners/communities/gdg_stavanger/index.html"},{"revision":"4a404ee92bbcf871576ca7cd3638a64e","url":"partners/communities/gdg_trondheim/index.html"},{"revision":"89fe223172563d2ca15e1b0a39383698","url":"partners/index.html"},{"revision":"d0d447e6088e4d6abd7b46373b3b7d87","url":"partners/organizers/gdg_bergen/index.html"},{"revision":"c91ff4a459b46863ee65c1a36062a2e2","url":"partners/organizers/gdg_cloud_oslo/index.html"},{"revision":"cc9ac9fd78c73bd80ec791bc1ab6f1df","url":"partners/organizers/gdg_oslo/index.html"},{"revision":"8728e5062237214a4c8d30f7dd5a6f5a","url":"partners/organizers/gdg_sorlandet/index.html"},{"revision":"261c293fc6e15d844ee6f4b15a441ddb","url":"partners/organizers/gdg_stavanger/index.html"},{"revision":"b23ab70f74e77b320e388b335fa938e9","url":"partners/organizers/gdg_trondheim/index.html"},{"revision":"79d7c9b3d684f4266a52513a0e034b11","url":"partners/sponsors/google/index.html"},{"revision":"d5751e644b8fe83443dfa30bc31d6be8","url":"schedule/index.html"},{"revision":"1c078b8a1ab9b2003eea6e79ae39e199","url":"sessions/__break/index.html"},{"revision":"269ac21bc3e3202fb8238ae0508ec36f","url":"sessions/__close/index.html"},{"revision":"a6cd83996648c9a13431a98594318234","url":"sessions/__hero/index.html"},{"revision":"4b657378ebdb29094f44efabadefb401","url":"sessions/__open/index.html"},{"revision":"29322e6fc42c374ceb612873937d7fca","url":"sessions/__quiz/index.html"},{"revision":"e587c531d37b16d59bcf893c3e1e30ed","url":"sessions/angular_material_design/index.html"},{"revision":"210a5b43a772ea7595a65eee9d3c8dd6","url":"sessions/beyond_es6/index.html"},{"revision":"ca723ce67735c1893cd835b9517683f3","url":"sessions/directives_in_angular/index.html"},{"revision":"304f8929905c33529dcc880c3ab7e0e1","url":"sessions/fair_ml_models/index.html"},{"revision":"7eabbbe1dc527baf9cc15627b121334b","url":"sessions/famous_app_uis_in_flutter/index.html"},{"revision":"7c8181b589996fa694ac52636ca6a870","url":"sessions/flutter_ecosystem/index.html"},{"revision":"a0c299ce327f27facf9a59835d4ec80d","url":"sessions/index.html"},{"revision":"b6a1722749dff66a9d8e7c4999b2dc92","url":"sessions/istio/index.html"},{"revision":"25bcc2302ac80577f2b1bc65a90c1f24","url":"sessions/make_flutter_secure/index.html"},{"revision":"949ce3eda94c5a2f7ba141408e72f2b9","url":"sessions/memory_leaking/index.html"},{"revision":"3c325febd111e4d20332aed6192acb4d","url":"sessions/ml_using_tensorflow_lite/index.html"},{"revision":"f02cf83630b7cccb044916d6013aa800","url":"sessions/mobile_devops/index.html"},{"revision":"06ae05508838328e97baa4e157eb88df","url":"sessions/multiplatform_triatholin_in_kotlin/index.html"},{"revision":"f41d193934fd5c3197e0e8a94036fe05","url":"sessions/no_way_jose/index.html"},{"revision":"c681d59925b89a453a4cbb149b7171ad","url":"sessions/robots/index.html"},{"revision":"5090f7708894aa5a250fd510597155b2","url":"sessions/serverless_on_cloudrun/index.html"},{"revision":"1cefbee88369d42e930d3f4e90ac38fa","url":"sessions/vue3/index.html"},{"revision":"d411333d607502eedc28be0354a919ac","url":"sessions/want_more_from_your_frontend/index.html"},{"revision":"b47178acb5ec818a79fd5c1431d8d1a4","url":"speakers/ashita_prasad/index.html"},{"revision":"05ccd6a0f2098f3913fa01756ec6f3ef","url":"speakers/carlos_mota/index.html"},{"revision":"63918773819f1b92ae577cf72fa05c73","url":"speakers/charmi_chokshi/index.html"},{"revision":"bb9d2ede0b4fa8bb50f8beb89ef94979","url":"speakers/dharmesh_vaya/index.html"},{"revision":"9e9b558778c7eb21cc68f4a4475b9330","url":"speakers/emma_twersky/index.html"},{"revision":"225d5f4ac8cd0090e2f2918f97024d45","url":"speakers/gaute_meek_olsen/index.html"},{"revision":"aad105f07e202860d2aff0fbb94f1d4e","url":"speakers/gil_fink/index.html"},{"revision":"d03ea2370cd5f8ceeda11d9ee284b62e","url":"speakers/hakon_silfvernagel/index.html"},{"revision":"acd680049ebcbae64613f650546a1cb4","url":"speakers/index.html"},{"revision":"4a1dea5b0d64d5e42fb507b911e20ff5","url":"speakers/jakub_holy/index.html"},{"revision":"49ff1c126147c3016edf639647b269a8","url":"speakers/kevin_davin/index.html"},{"revision":"ac9c8a2d6f9add8fa1f18080ceb97126","url":"speakers/nicola_corti/index.html"},{"revision":"5bcc24a66511e7fec8ad6f8f4d0632d4","url":"speakers/nivetha_maran/index.html"},{"revision":"39743eddd04b96d99afd961ee7cd2c04","url":"speakers/sakina_abbas/index.html"},{"revision":"53d8ee371b8d45f6d051ba505dc3986c","url":"speakers/sam_bellen/index.html"},{"revision":"f2bde831ce42f74ab3bf8f33d5616bec","url":"speakers/selin_ornek/index.html"},{"revision":"21b2b5f48353d880a6f2ffe8bbd63767","url":"speakers/sharmistha_chatterjee/index.html"},{"revision":"33e5954901f0ff2a6f5c6d059e9ecbd3","url":"speakers/waleed_arshad/index.html"},{"revision":"6f1deb49e72d30acf4ffb5ae7f96f983","url":"tags/_ai/index.html"},{"revision":"a717d66f436663ed8f36175d8f70f3e0","url":"tags/_backend/index.html"},{"revision":"286d3961bcabeba589b3cdbb6a7c630d","url":"tags/_mobile/index.html"},{"revision":"9b3dc2dfc2b20a0898100f1137391dc1","url":"tags/_web/index.html"},{"revision":"5e2e13d4974a29b9df417dddc1337d07","url":"tags/break/index.html"},{"revision":"6688495220a4cf77c035919e835ec0a4","url":"tags/close/index.html"},{"revision":"99dfa2a87b95c235fb9d82b79b4dd37e","url":"tags/hero/index.html"},{"revision":"04df43ec89a6027d7082762948355a28","url":"tags/index.html"},{"revision":"ff3fc5b467ecd97bf9287f40414973a2","url":"tags/open/index.html"},{"revision":"9ebcf7bd9b1489747a8ea6a0726323f6","url":"tags/quiz/index.html"},{"revision":"dbd57ecd6df8a04a76f97372e63a1131","url":"team/index.html"},{"revision":"3fb59ed24867a8dcb39ae6b7776de9ad","url":"styles/blog-page.css"},{"revision":"b12c09a3800e95d1c41cab553c23bedb","url":"styles/blog-section.css"},{"revision":"ec32dd200935668f292c3e2c7760ea99","url":"styles/home.css"},{"revision":"ec32dd200935668f292c3e2c7760ea99","url":"styles/page-home.css"},{"revision":"5c45f5cd8fd863e55a4d85da325fa920","url":"styles/page-page.css"},{"revision":"5c45f5cd8fd863e55a4d85da325fa920","url":"styles/page.css"},{"revision":"e3b5b458f160f82745495f82b12565db","url":"styles/partners-page.css"},{"revision":"d2111b68db2eb76c7dcfc9f2078e6c60","url":"styles/partners-section.css"},{"revision":"8bd826f6eb14b82c0772941c7aab8302","url":"styles/schedule-section.css"},{"revision":"0c53ce922a1df4690b7ca8419c912a11","url":"styles/sessions-page.css"},{"revision":"924faa5cf127788f1b3754efc6d39b7e","url":"styles/sessions-section.css"},{"revision":"4096a013ff01135a96d5c4d740188815","url":"styles/speakers-page.css"},{"revision":"8b110a41ff5c9838ae1b2edca6aa59bb","url":"styles/speakers-section.css"},{"revision":"d41a0cc2f9b8521db470598106c77504","url":"styles/team-section.css"},{"revision":"444364ee27394f6378b27b2d030b62de","url":"images/logos/logo.png"},{"revision":"9316b30cb573d30f11e10e9458f56942","url":"manifest/icon-72.png"},{"revision":"700237af96cc92ad5c99a4683750239a","url":"manifest/icon-large.png"},{"revision":"327414c23ea5d7737b9b0e2b12b0ae5b","url":"favicon.ico"},{"revision":"65ded980651e608a6bb4ea76ab5f1b74","url":"icons.svg"},{"revision":"e987cfbb3395532e02a036462e5105c7","url":"main.js"},{"revision":"925b1cfb3ff415d8a781c0a026a8f096","url":"modernizr-webp.js"},{"revision":"4096931795e0179a8fc0fd413b63ec53","url":"service-worker.js"},{"revision":"d9d8983feecdafc2ffead31d18dc0934","url":"sw-noop.js"},{"revision":"e987cfbb3395532e02a036462e5105c7","url":"theme.js"},{"revision":"a11e27ed15bcc43e5ebf6220bf0ebf33","url":"social-share.png"}], {
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
