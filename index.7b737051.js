var $fc9a1dac93b2e0f7$exports = {};
"use strict";
Object.defineProperty($fc9a1dac93b2e0f7$exports, "__esModule", {
    value: true
});
$fc9a1dac93b2e0f7$exports.getIframeMessagePort = $fc9a1dac93b2e0f7$exports.AmplitudeIframeClient = void 0;
var $6a7869eb39e38f71$exports = {};
"use strict";
Object.defineProperty($6a7869eb39e38f71$exports, "__esModule", {
    value: true
});
$6a7869eb39e38f71$exports.AmplitudeIframeClient = void 0;
var $5d64de89ed1ce8e4$exports = {};
"use strict";
Object.defineProperty($5d64de89ed1ce8e4$exports, "__esModule", {
    value: true
});
$5d64de89ed1ce8e4$exports.DEFAULT_POLLING_INTERVAL_MS = $5d64de89ed1ce8e4$exports.DOM_LOADED_STATES = $5d64de89ed1ce8e4$exports.DEFAULT_INSTANCE_ID = void 0;
$5d64de89ed1ce8e4$exports.DEFAULT_INSTANCE_ID = "default_instance_id";
$5d64de89ed1ce8e4$exports.DOM_LOADED_STATES = [
    "loaded",
    "complete",
    "interactive"
];
$5d64de89ed1ce8e4$exports.DEFAULT_POLLING_INTERVAL_MS = 500;


class $6a7869eb39e38f71$var$AmplitudeIframeClient {
    constructor(instanceId){
        this._isInitialized = false;
        this._port = null;
        this._queue = [];
        this._instanceId = instanceId;
    }
    static getInstance(id) {
        const instanceId = typeof id === "string" && Boolean(id) ? id.toLowerCase() : $5d64de89ed1ce8e4$exports.DEFAULT_INSTANCE_ID;
        const client = this._instances[instanceId];
        if (client) return client;
        return this._instances[instanceId] = new $6a7869eb39e38f71$var$AmplitudeIframeClient(instanceId);
    }
    init(port, apiKey, userId, config) {
        if (this._isInitialized) {
            console.error(`Client "${this._instanceId}": already initialized`);
            return;
        }
        if (!port) {
            console.error(`Client "${this._instanceId}": port or iframe id is required`);
            return;
        }
        if (typeof apiKey !== "string" || !apiKey) {
            console.error(`Client "${this._instanceId}": apiKey is required`);
            return;
        }
        this._port = port;
        this._waitForInitialization(apiKey, userId, config);
    }
    setUserId(userId1) {
        if (!this._isInitialized) {
            this._queue.push([
                "id",
                {
                    userId: userId1
                }
            ]);
            return;
        }
        this._postMessage("id", {
            userId: userId1
        });
    }
    setUserProperties(properties) {
        if (!this._isInitialized) {
            this._queue.push([
                "properties",
                {
                    properties: properties
                }
            ]);
            return;
        }
        this._postMessage("properties", {
            properties: properties
        });
    }
    logEvent(event1, additional) {
        if (!this._isInitialized) {
            this._queue.push([
                "event",
                {
                    event: event1,
                    additional: additional
                }
            ]);
            return;
        }
        this._postMessage("event", {
            event: event1,
            additional: additional
        });
    }
    _waitForInitialization(apiKey1, userId2, config1) {
        this._postMessage("init", {
            userId: userId2,
            apiKey: apiKey1,
            config: config1
        });
        const initializedInterval = setInterval(()=>{
            this._postMessage("init", {
                userId: userId2,
                apiKey: apiKey1,
                config: config1
            });
        }, $5d64de89ed1ce8e4$exports.DEFAULT_POLLING_INTERVAL_MS);
        const handleInitialized = (event)=>{
            const isInitializeEvent = this._port === event.source && event.data.type === "initialized";
            if (!this._isInitialized && !isInitializeEvent) return;
            this._clearQueue();
            this._isInitialized = true;
            console.log('is initialized');
            clearInterval(initializedInterval);
            window.removeEventListener("message", handleInitialized);
        };
        window.addEventListener("message", handleInitialized);
    }
    _postMessage(type, payload) {
        var _a;
        const instance = this._instanceId === $5d64de89ed1ce8e4$exports.DEFAULT_INSTANCE_ID ? null : this._instanceId;
        (_a = this._port) === null || _a === void 0 || _a.postMessage({
            type: type,
            payload: Object.assign({
                instance: instance
            }, payload)
        });
    }
    _clearQueue() {
        while(this._queue.length){
            const [eventType, payload] = this._queue.pop();
            this._postMessage(eventType, payload);
        }
    }
}
$6a7869eb39e38f71$exports.AmplitudeIframeClient = $6a7869eb39e38f71$var$AmplitudeIframeClient;
$6a7869eb39e38f71$var$AmplitudeIframeClient._instances = {
};


Object.defineProperty($fc9a1dac93b2e0f7$exports, "AmplitudeIframeClient", {
    enumerable: true,
    get: function() {
        return $6a7869eb39e38f71$exports.AmplitudeIframeClient;
    }
});
var $a5490563c9212718$exports = {};
"use strict";
Object.defineProperty($a5490563c9212718$exports, "__esModule", {
    value: true
});
$a5490563c9212718$exports.getIframeMessagePort = void 0;

const $a5490563c9212718$var$isDomContentLoaded = (document = window.document)=>{
    return $5d64de89ed1ce8e4$exports.DOM_LOADED_STATES.includes(document.readyState);
};
const $a5490563c9212718$var$isIframe = (element)=>element instanceof HTMLIFrameElement
;
const $a5490563c9212718$var$getIframeMessagePort = (iframeSelector)=>{
    return new Promise((ok, no)=>{
        if ($a5490563c9212718$var$isDomContentLoaded()) {
            const iframe = document.querySelector(iframeSelector);
            if (!$a5490563c9212718$var$isIframe(iframe)) no(new Error(`Provided selector ${iframeSelector} doesn't yield an iframe`));
            ok(iframe.contentWindow);
            return;
        }
        document.addEventListener("DOMContentLoaded", ()=>{
            const iframe = document.querySelector(iframeSelector);
            if (!$a5490563c9212718$var$isIframe(iframe)) no(new Error(`Provided selector ${iframeSelector} doesn't yield an iframe`));
            ok(iframe.contentWindow);
        });
    });
};
$a5490563c9212718$exports.getIframeMessagePort = $a5490563c9212718$var$getIframeMessagePort;


Object.defineProperty($fc9a1dac93b2e0f7$exports, "getIframeMessagePort", {
    enumerable: true,
    get: function() {
        return $a5490563c9212718$exports.getIframeMessagePort;
    }
});


(async ()=>{
    try {
        const iframeMp = await $fc9a1dac93b2e0f7$exports.getIframeMessagePort("#iframe");
        $fc9a1dac93b2e0f7$exports.AmplitudeIframeClient.getInstance().init(iframeMp, "5a5c2a0b4dac9ad7ab4461e20d3aa728");
    } catch (e) {
        console.error(e);
    }
})();
const $e8234519618d1dec$var$evtBtn = document.getElementById("event");
$e8234519618d1dec$var$evtBtn.addEventListener("click", ()=>{
    $fc9a1dac93b2e0f7$exports.AmplitudeIframeClient.getInstance().logEvent("test", {
        hello: "world",
        quick: [
            "brown",
            "fox"
        ]
    });
});
const $e8234519618d1dec$var$userBtn = document.getElementById("user");
$e8234519618d1dec$var$userBtn.addEventListener("click", ()=>{
    $fc9a1dac93b2e0f7$exports.AmplitudeIframeClient.getInstance().setUserId("123");
});
const $e8234519618d1dec$var$propertiesBtn = document.getElementById("properties");
$e8234519618d1dec$var$propertiesBtn.addEventListener("click", ()=>{
    $fc9a1dac93b2e0f7$exports.AmplitudeIframeClient.getInstance().setUserProperties({
        role: "anon"
    });
});


