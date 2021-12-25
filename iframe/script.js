window.addEventListener("message", function (e) {
    var d = e.data, p = d.payload, a = amplitude.getInstance;

    switch (d.type) {
        case "init":
            a(p.instance).init(p.apiKey, p.userId, p.config);

            window.top.postMessage({ type: "initialized" }, "*");
            break;

        case "properties":
            a(p.instance).setUserId(p.userId);
            break;

        case "properties":
            a(p.instance).setUserProperties(p.properties || {});
            break;

        case "event":
            a(p.instance).logEvent(p.event, p.additional);
            break;
    }
});
