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
precacheAndRoute([{"revision":"1b202bea599e39bc109af51453a264e7","url":"404.html"},{"revision":"731bc6948b8d17c199ef2d42a1dd60de","url":"blog/get-ready-for-2020/index.html"},{"revision":"c83386fab1e60d98346b7aa38dccea99","url":"blog/index.html"},{"revision":"b8e4b84b11551c8783318a8fc9aca966","url":"code-of-conduct/index.html"},{"revision":"c24f12bd71b9491321e872f1232b3c1e","url":"faq/index.html"},{"revision":"1f3403c23f5f87501d83873e927f48ec","url":"index.html"},{"revision":"e62e1a295a2a90c46c09f46b4d2b4d44","url":"partners/communities/gdg_bergen/index.html"},{"revision":"cb2c3941b599d12807c8d1b84a50761a","url":"partners/communities/gdg_cloud_oslo/index.html"},{"revision":"4a88a8197937191f63dad101c958c2f5","url":"partners/communities/gdg_oslo/index.html"},{"revision":"d16f12fb8542d3eb8d76b9afcdca39aa","url":"partners/communities/gdg_sorlandet/index.html"},{"revision":"3f97500587437c00dd9349b1fd425304","url":"partners/communities/gdg_stavanger/index.html"},{"revision":"e474500126afde74a6545ba631e40943","url":"partners/communities/gdg_trondheim/index.html"},{"revision":"e4dbf5f0f17d272354e5c88b56ecedf8","url":"partners/index.html"},{"revision":"2f1214c731c040109af711783d89c789","url":"partners/organizers/gdg_bergen/index.html"},{"revision":"cc05a6b6125f16501ffbfa8f0c6f738c","url":"partners/organizers/gdg_cloud_oslo/index.html"},{"revision":"b9d12908a6705ba55cfc8cb35bf16444","url":"partners/organizers/gdg_oslo/index.html"},{"revision":"2512864d8da6c7af73ad2f8063bfb91e","url":"partners/organizers/gdg_sorlandet/index.html"},{"revision":"9222384c435d6163039e171de8852a62","url":"partners/organizers/gdg_stavanger/index.html"},{"revision":"e23c1f8ec5d3d99aa40e7737fac9cbaf","url":"partners/organizers/gdg_trondheim/index.html"},{"revision":"25824f749a7a89feb4a43dd03a7c1479","url":"partners/sponsors/google/index.html"},{"revision":"85ef303eb799d60f217d9f93d624dcd2","url":"schedule/index.html"},{"revision":"a6e2c5be5a94f0fcd01ae7e52c4b3b60","url":"sessions/__break/index.html"},{"revision":"9897c0559951001a44d96077a4c167a6","url":"sessions/__close/index.html"},{"revision":"dc3ba1d0c9ff76bcb9ec5d5273c08cdd","url":"sessions/__hero/index.html"},{"revision":"06849517e1bf1a0fa3f12461a22ca699","url":"sessions/__open/index.html"},{"revision":"5ec8cf1df092758e07c67b3a16e12c49","url":"sessions/__quiz/index.html"},{"revision":"95e93eb04153ddd3d578dfa595e60e2a","url":"sessions/angular_material_design/index.html"},{"revision":"21469ccb9584eb2bb4ee516a2a981a90","url":"sessions/beyond_es6/index.html"},{"revision":"9d751f68fdc07b1ce01371b5a7238fba","url":"sessions/directives_in_angular/index.html"},{"revision":"1cc138869f93ee6e96765acd4ba3fe98","url":"sessions/fair_ml_models/index.html"},{"revision":"68a7543eae038a62fb2ef16927028806","url":"sessions/famous_app_uis_in_flutter/index.html"},{"revision":"c15aeb51570e6ec5af572164d0f15330","url":"sessions/flutter_ecosystem/index.html"},{"revision":"40e88e6bf51b301d571e3de9f8337c26","url":"sessions/index.html"},{"revision":"b7779cfdf34eb0153b14b966b7151e14","url":"sessions/istio/index.html"},{"revision":"a6f20fec5b9a0f929368891202a0a972","url":"sessions/make_flutter_secure/index.html"},{"revision":"0a8df244e9bddc5b86d231b379593180","url":"sessions/memory_leaking/index.html"},{"revision":"d7cbb1f070b5419ffeed803fdff8f880","url":"sessions/ml_using_tensorflow_lite/index.html"},{"revision":"45307991d73b6a4f67972be3d9e6e28d","url":"sessions/mobile_devops/index.html"},{"revision":"bbaa4a311f86fff0e805255fa9567f69","url":"sessions/multiplatform_triatholin_in_kotlin/index.html"},{"revision":"9f455423f69c5ce34e422778e3213f2b","url":"sessions/no_way_jose/index.html"},{"revision":"fc9a29f59fcba2e266de15497b249ffd","url":"sessions/robots/index.html"},{"revision":"e27bd321bd5b61cbbbee2a23d5dd6c65","url":"sessions/serverless_on_cloudrun/index.html"},{"revision":"3518480da7bfbb34633ce040df6d8202","url":"sessions/vue3/index.html"},{"revision":"a3e85499ac9dccf5691ad3db8e2aeea2","url":"sessions/want_more_from_your_frontend/index.html"},{"revision":"7c9cdf2fe681d8543564b927d58587d9","url":"speakers/ashita_prasad/index.html"},{"revision":"2a31d5c509e86d94b305e0f0019e9025","url":"speakers/carlos_mota/index.html"},{"revision":"e7a6f357614b6ee86652b4ea042c514b","url":"speakers/charmi_chokshi/index.html"},{"revision":"52c4d60321efd0d9f8e0be82e04f04ef","url":"speakers/dharmesh_vaya/index.html"},{"revision":"46aad98e309084ba2f4c9b07dd88a82d","url":"speakers/emma_twersky/index.html"},{"revision":"fe6c7fec692e194734f524b516585d77","url":"speakers/gaute_meek_olsen/index.html"},{"revision":"d382e387135f917b82e6f00f1da1cf52","url":"speakers/gil_fink/index.html"},{"revision":"698b7d06506e00805bff003edb10533d","url":"speakers/hakon_silfvernagel/index.html"},{"revision":"e27b6fd2fbfcb8ef6e4a924a88633b7a","url":"speakers/index.html"},{"revision":"1297eeb777943d65e007c70d077f8963","url":"speakers/jakub_holy/index.html"},{"revision":"23c61d6b7121c89e7cf63cd040f33701","url":"speakers/kevin_davin/index.html"},{"revision":"9b3a53933341ab69e162b40d50a60ea9","url":"speakers/nicola_corti/index.html"},{"revision":"7df58b8eb42c4875c526680513c91371","url":"speakers/nivetha_maran/index.html"},{"revision":"6bec1c511fbfab90abfe3fd880946525","url":"speakers/sakina_abbas/index.html"},{"revision":"da5fa511e2f61c0ba76ec41af7f31c51","url":"speakers/sam_bellen/index.html"},{"revision":"5d0520bff48aa54f3f457e0cf2a4806f","url":"speakers/selin_ornek/index.html"},{"revision":"aa2d1361ee161f226f3d37389450cb48","url":"speakers/sharmistha_chatterjee/index.html"},{"revision":"f4c3b7e0a050c5be3ab99d4ff4d63878","url":"speakers/waleed_arshad/index.html"},{"revision":"aca11b572c9b94b7616d8b455a814065","url":"tags/_ai/index.html"},{"revision":"6037b1a09bda55f27dcc0a3a7c024937","url":"tags/_backend/index.html"},{"revision":"187a0cb30d5c1aeb1f2e90ff5c21c238","url":"tags/_mobile/index.html"},{"revision":"ea120cf5167f505596bd12d9e5baa274","url":"tags/_web/index.html"},{"revision":"2949e37871ac713e1632c0fe87971bd9","url":"tags/break/index.html"},{"revision":"ce8f7d780305a09400778c72048ef76f","url":"tags/close/index.html"},{"revision":"279b14f2632e06c4e32b3522295c7512","url":"tags/hero/index.html"},{"revision":"512f7f8b8805b6728e398b832b5fa123","url":"tags/index.html"},{"revision":"735f2dfb39c620edc19442702070316c","url":"tags/open/index.html"},{"revision":"ed5f29b93b21ba9cf99eeb56c4e8b888","url":"tags/quiz/index.html"},{"revision":"b6584f7de16e53710ad4918ec2b6e8fc","url":"team/index.html"},{"revision":"3fb59ed24867a8dcb39ae6b7776de9ad","url":"styles/blog-page.css"},{"revision":"b12c09a3800e95d1c41cab553c23bedb","url":"styles/blog-section.css"},{"revision":"ec32dd200935668f292c3e2c7760ea99","url":"styles/home.css"},{"revision":"ec32dd200935668f292c3e2c7760ea99","url":"styles/page-home.css"},{"revision":"5c45f5cd8fd863e55a4d85da325fa920","url":"styles/page-page.css"},{"revision":"5c45f5cd8fd863e55a4d85da325fa920","url":"styles/page.css"},{"revision":"e3b5b458f160f82745495f82b12565db","url":"styles/partners-page.css"},{"revision":"d2111b68db2eb76c7dcfc9f2078e6c60","url":"styles/partners-section.css"},{"revision":"8bd826f6eb14b82c0772941c7aab8302","url":"styles/schedule-section.css"},{"revision":"0c53ce922a1df4690b7ca8419c912a11","url":"styles/sessions-page.css"},{"revision":"924faa5cf127788f1b3754efc6d39b7e","url":"styles/sessions-section.css"},{"revision":"4096a013ff01135a96d5c4d740188815","url":"styles/speakers-page.css"},{"revision":"8b110a41ff5c9838ae1b2edca6aa59bb","url":"styles/speakers-section.css"},{"revision":"d41a0cc2f9b8521db470598106c77504","url":"styles/team-section.css"},{"revision":"444364ee27394f6378b27b2d030b62de","url":"images/logos/logo.png"},{"revision":"9316b30cb573d30f11e10e9458f56942","url":"manifest/icon-72.png"},{"revision":"700237af96cc92ad5c99a4683750239a","url":"manifest/icon-large.png"},{"revision":"327414c23ea5d7737b9b0e2b12b0ae5b","url":"favicon.ico"},{"revision":"65ded980651e608a6bb4ea76ab5f1b74","url":"icons.svg"},{"revision":"e987cfbb3395532e02a036462e5105c7","url":"main.js"},{"revision":"925b1cfb3ff415d8a781c0a026a8f096","url":"modernizr-webp.js"},{"revision":"4096931795e0179a8fc0fd413b63ec53","url":"service-worker.js"},{"revision":"d9d8983feecdafc2ffead31d18dc0934","url":"sw-noop.js"},{"revision":"e987cfbb3395532e02a036462e5105c7","url":"theme.js"},{"revision":"a11e27ed15bcc43e5ebf6220bf0ebf33","url":"social-share.png"}], {
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
