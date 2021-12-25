import { DOM_LOADED_STATES } from "./constants";

export const isDomContentLoaded = () => {
  return !window || DOM_LOADED_STATES.includes(document.readyState);
};
