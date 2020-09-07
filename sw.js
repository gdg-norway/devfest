!function(){"use strict";try{self["workbox:core:5.1.3"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const s=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),"");class n{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:i=!1}={}){return await this.transaction([e],"readonly",(r,c)=>{const o=r.objectStore(e),h=t?o.index(t):o,l=[],u=h.openCursor(s,n);u.onsuccess=()=>{const e=u.result;e?(l.push(i?e:e.value),a&&l.length>=a?c(l):e.continue()):c(l)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,a)=>{const i=this._db.transaction(e,t);i.onabort=()=>a(i.error),i.oncomplete=()=>n(),s(i,e=>n(e))})}async _call(e,t,s,...n){return await this.transaction([t],s,(s,a)=>{const i=s.objectStore(t),r=i[e].apply(i,n);r.onsuccess=()=>a(r.result)})}close(){this._db&&(this._db.close(),this._db=null)}}n.prototype.OPEN_TIMEOUT=2e3;const a={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(a))for(const s of t)s in IDBObjectStore.prototype&&(n.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});try{self["workbox:background-sync:5.1.3"]&&_()}catch(e){}class i{constructor(e){this._queueName=e,this._db=new n("workbox-background-sync",3,{onupgradeneeded:this._upgradeDb})}async pushEntry(e){delete e.id,e.queueName=this._queueName,await this._db.add("requests",e)}async unshiftEntry(e){const[t]=await this._db.getAllMatching("requests",{count:1});t?e.id=t.id-1:delete e.id,e.queueName=this._queueName,await this._db.add("requests",e)}async popEntry(){return this._removeEntry({direction:"prev"})}async shiftEntry(){return this._removeEntry({direction:"next"})}async getAll(){return await this._db.getAllMatching("requests",{index:"queueName",query:IDBKeyRange.only(this._queueName)})}async deleteEntry(e){await this._db.delete("requests",e)}async _removeEntry({direction:e}){const[t]=await this._db.getAllMatching("requests",{direction:e,index:"queueName",query:IDBKeyRange.only(this._queueName),count:1});if(t)return await this.deleteEntry(t.id),t}_upgradeDb(e){const t=e.target.result;e.oldVersion>0&&e.oldVersion<3&&t.objectStoreNames.contains("requests")&&t.deleteObjectStore("requests");t.createObjectStore("requests",{autoIncrement:!0,keyPath:"id"}).createIndex("queueName","queueName",{unique:!1})}}const r=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class c{constructor(e){"navigate"===e.mode&&(e.mode="same-origin"),this._requestData=e}static async fromRequest(e){const t={url:e.url,headers:{}};"GET"!==e.method&&(t.body=await e.clone().arrayBuffer());for(const[s,n]of e.headers.entries())t.headers[s]=n;for(const s of r)void 0!==e[s]&&(t[s]=e[s]);return new c(t)}toObject(){const e=Object.assign({},this._requestData);return e.headers=Object.assign({},this._requestData.headers),e.body&&(e.body=e.body.slice(0)),e}toRequest(){return new Request(this._requestData.url,this._requestData)}clone(){return new c(this.toObject())}}const o=new Set,h=e=>{const t={request:new c(e.requestData).toRequest(),timestamp:e.timestamp};return e.metadata&&(t.metadata=e.metadata),t};class l{constructor(e,{onSync:s,maxRetentionTime:n}={}){if(this._syncInProgress=!1,this._requestsAddedDuringSync=!1,o.has(e))throw new t("duplicate-queue-name",{name:e});o.add(e),this._name=e,this._onSync=s||this.replayRequests,this._maxRetentionTime=n||10080,this._queueStore=new i(this._name),this._addSyncListener()}get name(){return this._name}async pushRequest(e){await this._addRequest(e,"push")}async unshiftRequest(e){await this._addRequest(e,"unshift")}async popRequest(){return this._removeRequest("pop")}async shiftRequest(){return this._removeRequest("shift")}async getAll(){const e=await this._queueStore.getAll(),t=Date.now(),s=[];for(const n of e){const e=60*this._maxRetentionTime*1e3;t-n.timestamp>e?await this._queueStore.deleteEntry(n.id):s.push(h(n))}return s}async _addRequest({request:e,metadata:t,timestamp:s=Date.now()},n){const a={requestData:(await c.fromRequest(e.clone())).toObject(),timestamp:s};t&&(a.metadata=t),await this._queueStore[n+"Entry"](a),this._syncInProgress?this._requestsAddedDuringSync=!0:await this.registerSync()}async _removeRequest(e){const t=Date.now(),s=await this._queueStore[e+"Entry"]();if(s){const n=60*this._maxRetentionTime*1e3;return t-s.timestamp>n?this._removeRequest(e):h(s)}}async replayRequests(){let e;for(;e=await this.shiftRequest();)try{await fetch(e.request.clone())}catch(s){throw await this.unshiftRequest(e),new t("queue-replay-failed",{name:this._name})}}async registerSync(){if("sync"in self.registration)try{await self.registration.sync.register("workbox-background-sync:"+this._name)}catch(e){}}_addSyncListener(){"sync"in self.registration?self.addEventListener("sync",e=>{if(e.tag==="workbox-background-sync:"+this._name){const t=async()=>{let t;this._syncInProgress=!0;try{await this._onSync({queue:this})}catch(e){throw t=e,t}finally{!this._requestsAddedDuringSync||t&&!e.lastChance||await this.registerSync(),this._syncInProgress=!1,this._requestsAddedDuringSync=!1}};e.waitUntil(t())}}):this._onSync({queue:this})}static get _queueNames(){return o}}class u{constructor(e,t){this.fetchDidFail=async({request:e})=>{await this._queue.pushRequest({request:e})},this._queue=new l(e,t)}}const d={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},f=e=>[d.prefix,e,d.suffix].filter(e=>e&&e.length>0).join("-"),p=e=>e||f(d.googleAnalytics),m=e=>e||f(d.precache),g=e=>e||f(d.runtime);try{self["workbox:routing:5.1.3"]&&_()}catch(e){}const w=e=>e&&"object"==typeof e?e:{handle:e};class y{constructor(e,t,s="GET"){this.handler=w(t),this.match=e,this.method=s}}class b{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const{params:n,route:a}=this.findMatchingRoute({url:s,request:e,event:t});let i,r=a&&a.handler;if(!r&&this._defaultHandler&&(r=this._defaultHandler),r){try{i=r.handle({url:s,request:e,event:t,params:n})}catch(e){i=Promise.reject(e)}return i instanceof Promise&&this._catchHandler&&(i=i.catch(n=>this._catchHandler.handle({url:s,request:e,event:t}))),i}}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const a of n){let n;const i=a.match({url:e,request:t,event:s});if(i)return n=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=w(e)}setCatchHandler(e){this._catchHandler=w(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}const v=new Set;const q=(e,t)=>e.filter(e=>t in e),x=async({request:e,mode:t,plugins:s=[]})=>{const n=q(s,"cacheKeyWillBeUsed");let a=e;for(const e of n)a=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:a}),"string"==typeof a&&(a=new Request(a));return a},R=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:a=[]})=>{const i=await self.caches.open(e),r=await x({plugins:a,request:t,mode:"read"});let c=await i.match(r,n);for(const t of a)if("cachedResponseWillBeUsed"in t){const a=t.cachedResponseWillBeUsed;c=await a.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:c,request:r})}return c},N=async({cacheName:e,request:n,response:a,event:i,plugins:r=[],matchOptions:c})=>{const o=await x({plugins:r,request:n,mode:"write"});if(!a)throw new t("cache-put-with-no-response",{url:s(o.url)});const h=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let a=t,i=!1;for(const t of n)if("cacheWillUpdate"in t){i=!0;const n=t.cacheWillUpdate;if(a=await n.call(t,{request:e,response:a,event:s}),!a)break}return i||(a=a&&200===a.status?a:void 0),a||null})({event:i,plugins:r,response:a,request:o});if(!h)return;const l=await self.caches.open(e),u=q(r,"cacheDidUpdate"),d=u.length>0?await R({cacheName:e,matchOptions:c,request:o}):null;try{await l.put(o,h)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of v)await e()}(),e}for(const t of u)await t.cacheDidUpdate.call(t,{cacheName:e,event:i,oldResponse:d,newResponse:h,request:o})},E=R,T=async({request:e,fetchOptions:s,event:n,plugins:a=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const i=q(a,"fetchDidFail"),r=i.length>0?e.clone():null;try{for(const t of a)if("requestWillFetch"in t){const s=t.requestWillFetch,a=e.clone();e=await s.call(t,{request:a,event:n})}}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const c=e.clone();try{let t;t="navigate"===e.mode?await fetch(e):await fetch(e,s);for(const e of a)"fetchDidSucceed"in e&&(t=await e.fetchDidSucceed.call(e,{event:n,request:c,response:t}));return t}catch(e){for(const t of i)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:r.clone(),request:c.clone()});throw e}};try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}const U={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class S{constructor(e={}){if(this._cacheName=g(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[U,...e.plugins]}else this._plugins=[U];this._networkTimeoutSeconds=e.networkTimeoutSeconds||0,this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:s}){const n=[];"string"==typeof s&&(s=new Request(s));const a=[];let i;if(this._networkTimeoutSeconds){const{id:t,promise:r}=this._getTimeoutPromise({request:s,event:e,logs:n});i=t,a.push(r)}const r=this._getNetworkPromise({timeoutId:i,request:s,event:e,logs:n});a.push(r);let c=await Promise.race(a);if(c||(c=await r),!c)throw new t("no-response",{url:s.url});return c}_getTimeoutPromise({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this._respondFromCache({request:e,event:s}))},1e3*this._networkTimeoutSeconds)}),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,event:n}){let a,i;try{i=await T({request:t,event:n,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){a=e}if(e&&clearTimeout(e),a||!i)i=await this._respondFromCache({request:t,event:n});else{const e=i.clone(),s=N({cacheName:this._cacheName,request:t,response:e,event:n,plugins:this._plugins});if(n)try{n.waitUntil(s)}catch(e){}}return i}_respondFromCache({event:e,request:t}){return E({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins})}}class O{constructor(e={}){this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions}async handle({event:e,request:s}){let n,a;"string"==typeof s&&(s=new Request(s));try{a=await T({request:s,event:e,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){n=e}if(!a)throw new t("no-response",{url:s.url,error:n});return a}}try{self["workbox:google-analytics:5.1.3"]&&_()}catch(e){}const k=/^\/(\w+\/)?collect/,L=e=>{const t=({url:e})=>"www.google-analytics.com"===e.hostname&&k.test(e.pathname),s=new O({plugins:[e]});return[new y(t,s,"GET"),new y(t,s,"POST")]},D=e=>{const t=new S({cacheName:e});return new y(({url:e})=>"www.google-analytics.com"===e.hostname&&"/analytics.js"===e.pathname,t,"GET")},C=e=>{const t=new S({cacheName:e});return new y(({url:e})=>"www.googletagmanager.com"===e.hostname&&"/gtag/js"===e.pathname,t,"GET")},K=e=>{const t=new S({cacheName:e});return new y(({url:e})=>"www.googletagmanager.com"===e.hostname&&"/gtm.js"===e.pathname,t,"GET")};try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}const A=[],P={get:()=>A,add(e){A.push(...e)}};let M;async function j(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(n):n,i=function(){if(void 0===M){const e=new Response("");if("body"in e)try{new Response(e.body),M=!0}catch(e){M=!1}M=!1}return M}()?s.body:await s.blob();return new Response(i,a)}function W(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:n}=e;if(!n)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(n,location.href),i=new URL(n,location.href);return a.searchParams.set("__WB_REVISION__",s),{cacheKey:a.href,url:i.href}}class I{constructor(e){this._cacheName=m(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const s=[];for(const n of e){"string"==typeof n?s.push(n):n&&void 0===n.revision&&s.push(n.url);const{cacheKey:e,url:a}=W(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,i),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],a=await self.caches.open(this._cacheName),i=await a.keys(),r=new Set(i.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)r.has(t)?n.push(e):s.push({cacheKey:t,url:e});const c=s.map(({cacheKey:s,url:n})=>{const a=this._cacheKeysToIntegrities.get(s),i=this._urlsToCacheModes.get(n);return this._addURLToCache({cacheKey:s,cacheMode:i,event:e,integrity:a,plugins:t,url:n})});await Promise.all(c);return{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async _addURLToCache({cacheKey:e,url:s,cacheMode:n,event:a,plugins:i,integrity:r}){const c=new Request(s,{integrity:r,cache:n,credentials:"same-origin"});let o,h=await T({event:a,plugins:i,request:c});for(const e of i||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:a,request:c,response:h}):h.status<400))throw new t("bad-precaching-response",{url:s,status:h.status});h.redirected&&(h=await j(h)),await N({event:a,plugins:i,response:h,request:e===s?c:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this._cacheName)).match(s)}}createHandler(e=!0){return async({request:s})=>{try{const e=await this.matchPrecache(s);if(e)return e;throw new t("missing-precache-entry",{cacheName:this._cacheName,url:s instanceof Request?s.url:s})}catch(t){if(e)return fetch(s);throw t}}}createHandlerBoundToURL(e,s=!0){if(!this.getCacheKeyForURL(e))throw new t("non-precached-url",{url:e});const n=this.createHandler(s),a=new Request(e);return()=>n({request:a})}}let F;const H=()=>(F||(F=new I),F);const B=(e,t)=>{const s=H().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const r=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(i,t);if(yield r.href,s&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=s,yield e.href}if(n){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:i});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let z=!1;function G(e){z||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const a=m();self.addEventListener("fetch",i=>{const r=B(i.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!r)return;let c=self.caches.open(a).then(e=>e.match(r)).then(e=>e||fetch(r));i.respondWith(c)})})(e),z=!0)}const Q=e=>{const t=H(),s=P.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},V=e=>{const t=H();e.waitUntil(t.activate())};class J extends y{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}let $;const X=()=>($||($=new b,$.addFetchListener(),$.addCacheListener()),$);function Y(e,s,n){let a;if("string"==typeof e){const t=new URL(e,location.href);a=new y(({url:e})=>e.href===t.href,s,n)}else if(e instanceof RegExp)a=new J(e,s,n);else if("function"==typeof e)a=new y(e,s,n);else{if(!(e instanceof y))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return X().registerRoute(a),a}function Z(e){e.then(()=>{})}try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}const ee=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class te{constructor(e){this._cacheName=e,this._db=new n("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this._cacheName)}async setTimestamp(e,t){const s={url:e=ee(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put("cache-entries",s)}async getTimestamp(e){return(await this._db.get("cache-entries",this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction("cache-entries","readwrite",(s,n)=>{const a=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),i=[];let r=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&r>=t?i.push(s.value):r++),s.continue()}else n(i)}}),n=[];for(const e of s)await this._db.delete("cache-entries",e.id),n.push(e.url);return n}_getId(e){return this._cacheName+"|"+ee(e)}}class se{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new te(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,Z(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class ne{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),i=this._getCacheExpiration(s);Z(i.expireEntries());const r=i.updateTimestamp(t.url);if(e)try{e.waitUntil(r)}catch(e){}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),v.add(t))}_getCacheExpiration(e){if(e===g())throw new t("expire-custom-caches-only");let s=this._cacheExpirations.get(e);return s||(s=new se(e,this._config),this._cacheExpirations.set(e,s)),s}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);if(null===t)return!0;return t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}var ae;((e={})=>{const t=p(e.cacheName),s=new u("workbox-google-analytics",{maxRetentionTime:2880,onSync:(n=e,async({queue:e})=>{let t;for(;t=await e.shiftRequest();){const{request:s,timestamp:a}=t,i=new URL(s.url);try{const e="POST"===s.method?new URLSearchParams(await s.clone().text()):i.searchParams,t=a-(Number(e.get("qt"))||0),r=Date.now()-t;if(e.set("qt",String(r)),n.parameterOverrides)for(const t of Object.keys(n.parameterOverrides)){const s=n.parameterOverrides[t];e.set(t,s)}"function"==typeof n.hitFilter&&n.hitFilter.call(null,e),await fetch(new Request(i.origin+i.pathname,{body:e.toString(),method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain"}}))}catch(s){throw await e.unshiftRequest(t),s}}})});var n;const a=[K(t),D(t),C(t),...L(s)],i=new b;for(const e of a)i.registerRoute(e);i.addFetchListener()})(),self.addEventListener("install",()=>self.skipWaiting()),self.addEventListener("activate",()=>self.clients.claim()),ae={urlManipulation:({url:e})=>[e],ignoreURLParametersMatching:[/.*/]},function(e){H().addToCacheList(e),e.length>0&&(self.addEventListener("install",Q),self.addEventListener("activate",V))}([{revision:"569fc84f60aa38ca6c3caba88e915101",url:"404.html"},{revision:"37d31aa9c10f4d74ac5940293cab9c81",url:"blog/get-ready-for-2020/index.html"},{revision:"0cd2b5ddafe954680fe9b77325f011ca",url:"blog/index.html"},{revision:"4dbc126c10556a6e42069df05bf82b3c",url:"code-of-conduct/index.html"},{revision:"bb826d74b9193d8fefe260aa1912748d",url:"faq/index.html"},{revision:"ee3b8c33707b0ad997925968d86a599a",url:"index.html"},{revision:"ae91e1a785f0cd2e779d28bea1203b7c",url:"partners/communities/gdg_bergen/index.html"},{revision:"a4249543e6390a7726b285d426cf18a3",url:"partners/communities/gdg_cloud_oslo/index.html"},{revision:"eea38b7a70eba8ad4c8a33abb61fbc60",url:"partners/communities/gdg_oslo/index.html"},{revision:"80e1c64f0c5c5703129a49d2e9acb156",url:"partners/communities/gdg_sorlandet/index.html"},{revision:"7ed199851663dbdfa45c079e38dc331e",url:"partners/communities/gdg_stavanger/index.html"},{revision:"ce96bb58d11d452a00a6aed2848b7abe",url:"partners/communities/gdg_trondheim/index.html"},{revision:"aa33fcac06f815f88ed0d9cc1379e170",url:"partners/index.html"},{revision:"f77926fbb7605faa22b6ed0d72cccce7",url:"partners/organizers/gdg_bergen/index.html"},{revision:"0da4cca78b88dd256f2202bfbe438c53",url:"partners/organizers/gdg_cloud_oslo/index.html"},{revision:"74433cb26451954c3cab8023c3721471",url:"partners/organizers/gdg_oslo/index.html"},{revision:"8ad57cdb1b34ad01f5cde88e2651d596",url:"partners/organizers/gdg_sorlandet/index.html"},{revision:"7ac0071242d07c5fac2005639d975c5a",url:"partners/organizers/gdg_stavanger/index.html"},{revision:"0c2de2c56326fac2f81b7cad0525fe2a",url:"partners/organizers/gdg_trondheim/index.html"},{revision:"e1b8b9edd6277068d433d0fec60ecb50",url:"partners/sponsors/google/index.html"},{revision:"dfc8b6022916876503b52c72bb55e41b",url:"schedule/index.html"},{revision:"c56223189433c07a88374d472850f58e",url:"sessions/__close/index.html"},{revision:"c206e37be51a67658a23bc6333d1b0fe",url:"sessions/__open/index.html"},{revision:"757e7f1defcbc92e1bb363a0c7e73eba",url:"sessions/__panel_1/index.html"},{revision:"5149125815f17e95dac2f44792913e6e",url:"sessions/__panel_2/index.html"},{revision:"5ba864d4a4fdde0020a1b89bc2ec16a9",url:"sessions/__panel_3/index.html"},{revision:"41440090d2377b37c2e0ffd3376ad671",url:"sessions/__panel_4/index.html"},{revision:"22ca168a09b9e9cdc14ae534ef8bab43",url:"sessions/index.html"},{revision:"5da5834494afd5bd009aba99cbc95106",url:"sessions/tba/index.html"},{revision:"e10fd4e457abb2459a928b87e49715c7",url:"speakers/index.html"},{revision:"45bc8962716d69a41fe6be775315f475",url:"speakers/tba/index.html"},{revision:"3853ce4cd81817034c5513cfd1f73c72",url:"tags/_web/index.html"},{revision:"ca599f045a77a325fe55d68ee7ec7275",url:"tags/close/index.html"},{revision:"be94fc7ce8f059b00c8fa04ad581ab82",url:"tags/index.html"},{revision:"dc280d40fe642b34fc750ddcd1d0b707",url:"tags/open/index.html"},{revision:"f7a5f866e29db347b155646036c155fc",url:"tags/panel/index.html"},{revision:"1d216923ffcb53d7a622b9b76d4caae8",url:"team/index.html"},{revision:"3fb59ed24867a8dcb39ae6b7776de9ad",url:"styles/blog-page.css"},{revision:"b12c09a3800e95d1c41cab553c23bedb",url:"styles/blog-section.css"},{revision:"3ffbaa4ad3f43cc5c0a8b0e4f2e9129c",url:"styles/home.css"},{revision:"3ffbaa4ad3f43cc5c0a8b0e4f2e9129c",url:"styles/page-home.css"},{revision:"5c45f5cd8fd863e55a4d85da325fa920",url:"styles/page-page.css"},{revision:"5c45f5cd8fd863e55a4d85da325fa920",url:"styles/page.css"},{revision:"e3b5b458f160f82745495f82b12565db",url:"styles/partners-page.css"},{revision:"d2111b68db2eb76c7dcfc9f2078e6c60",url:"styles/partners-section.css"},{revision:"0febe2a7080670832c1e015b9da7afc0",url:"styles/schedule-section.css"},{revision:"f87596c33dc9853921d11f6e65a632b8",url:"styles/sessions-page.css"},{revision:"5a5447955e2ab4fc46e311538d458639",url:"styles/sessions-section.css"},{revision:"9cc6a56dc7e57860f1a03d5fa048bd73",url:"styles/speakers-page.css"},{revision:"8b110a41ff5c9838ae1b2edca6aa59bb",url:"styles/speakers-section.css"},{revision:"d41a0cc2f9b8521db470598106c77504",url:"styles/team-section.css"},{revision:"cdf476293c49c6f090f3efc863567edc",url:"images/logos/logo.png"},{revision:"09cc2e80070c40a17d93404fa8d15786",url:"manifest/icon-72.png"},{revision:"1fe42cd1c7f954d0dc587fe7e3a6d6c4",url:"manifest/icon-large.png"},{revision:"327414c23ea5d7737b9b0e2b12b0ae5b",url:"favicon.ico"},{revision:"65ded980651e608a6bb4ea76ab5f1b74",url:"icons.svg"},{revision:"e987cfbb3395532e02a036462e5105c7",url:"main.js"},{revision:"925b1cfb3ff415d8a781c0a026a8f096",url:"modernizr-webp.js"},{revision:"4096931795e0179a8fc0fd413b63ec53",url:"service-worker.js"},{revision:"d9d8983feecdafc2ffead31d18dc0934",url:"sw-noop.js"},{revision:"e987cfbb3395532e02a036462e5105c7",url:"theme.js"},{revision:"a11e27ed15bcc43e5ebf6220bf0ebf33",url:"social-share.png"}]),G(ae),Y(({request:e})=>"image"===e.destination,new class{constructor(e={}){this._cacheName=g(e.cacheName),this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));let n,a=await E({cacheName:this._cacheName,request:s,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(!a)try{a=await this._getFromNetwork(s,e)}catch(e){n=e}if(!a)throw new t("no-response",{url:s.url,error:n});return a}async _getFromNetwork(e,t){const s=await T({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=s.clone(),a=N({cacheName:this._cacheName,request:e,response:n,event:t,plugins:this._plugins});if(t)try{t.waitUntil(a)}catch(e){}return s}}({cacheName:"images",plugins:[new ne({maxEntries:100,maxAgeSeconds:2592e3,purgeOnQuotaError:!0})]})),Y(new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),new class{constructor(e={}){if(this._cacheName=g(e.cacheName),this._plugins=e.plugins||[],e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[U,...e.plugins]}else this._plugins=[U];this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:s}){"string"==typeof s&&(s=new Request(s));const n=this._getFromNetwork({request:s,event:e});let a,i=await E({cacheName:this._cacheName,request:s,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(i){if(e)try{e.waitUntil(n)}catch(a){}}else try{i=await n}catch(e){a=e}if(!i)throw new t("no-response",{url:s.url,error:a});return i}async _getFromNetwork({request:e,event:t}){const s=await T({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=N({cacheName:this._cacheName,request:e,response:s.clone(),event:t,plugins:this._plugins});if(t)try{t.waitUntil(n)}catch(e){}return s}}({cacheName:"googleapis",plugins:[new ne({maxEntries:30})]})),self.addEventListener("push",(function(e){console.log("[Service Worker]: Received push event",e);var t={};t=e.data.json()?e.data.json().notification:{title:"Something Has Happened",message:"Something you might want to check out",icon:"/assets/images/logo.png"},self.registration.showNotification(t.title,t)})),self.addEventListener("notificationclick",(function(e){console.log("[Service Worker]: Received notificationclick event"),e.notification.close(),"opentweet"==e.action?(console.log("[Service Worker]: Performing action opentweet"),e.waitUntil(clients.openWindow(e.notification.data).then((function(e){})))):(console.log("[Service Worker]: Performing default click action"),e.waitUntil(clients.matchAll({includeUncontrolled:!0,type:"window"}).then((function(e){for(var t=0;t<e.length;t++){var s=e[t];if("/"==s.url&&"focus"in s)return s.focus()}if(clients.openWindow)return clients.openWindow("/")}))))})),self.addEventListener("notificationclose",(function(e){log("[Service Worker]: Received notificationclose event")}))}();
