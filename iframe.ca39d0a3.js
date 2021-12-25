window.addEventListener("message", function(e) {
    var t = e.data, i = t.payload, s = amplitude.getInstance.bind(amplitude);
    switch(t.type){
        case "init":
            s(i.instance).init(i.apiKey, i.userId, i.config), window.top.postMessage({
                type: "initialized"
            }, "*");
            break;
        case "id":
            s(i.instance).setUserId(i.userId);
            break;
        case "properties":
            s(i.instance).setUserProperties(i.properties || {
            });
            break;
        case "event":
            s(i.instance).logEvent(i.event, i.additional);
    }
});

