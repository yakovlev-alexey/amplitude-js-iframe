import {
  AmplitudeIframeClient,
  getIframeMessagePort,
} from "amplitude-js-iframe";

(async () => {
  try {
    const iframeMp = await getIframeMessagePort("#iframe");
    AmplitudeIframeClient.getInstance().init(
      iframeMp,
      "5a5c2a0b4dac9ad7ab4461e20d3aa728"
    );
  } catch (e) {
    console.error(e);
  }
})();

const evtBtn = document.getElementById("event");
evtBtn.addEventListener("click", () => {
  AmplitudeIframeClient.getInstance().logEvent("test", {
    hello: "world",
    quick: ["brown", "fox"],
  });
});

const userBtn = document.getElementById("user");
userBtn.addEventListener("click", () => {
  AmplitudeIframeClient.getInstance().setUserId("123");
});

const propertiesBtn = document.getElementById("properties");
propertiesBtn.addEventListener("click", () => {
  AmplitudeIframeClient.getInstance().setUserProperties({ role: "anon" });
});
