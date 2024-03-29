import { DOM_LOADED_STATES } from "./constants";

const isDomContentLoaded = (document = window.document) => {
    return DOM_LOADED_STATES.includes(document.readyState);
};

const isIframe = (element: Element | null): element is HTMLIFrameElement =>
    element instanceof HTMLIFrameElement;

export const getIframeMessagePort = (iframeSelector: string): Promise<WindowProxy> => {
    return new Promise((ok, no) => {
        if (isDomContentLoaded()) {
            const iframe = document.querySelector(iframeSelector);

            if (!isIframe(iframe)) {
                no(new Error(`Provided selector ${iframeSelector} doesn't yield an iframe`));
            }

            // iframe is returned by query selector therefore is in DOM
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ok((iframe as HTMLIFrameElement).contentWindow!);
            return;
        }

        document.addEventListener("DOMContentLoaded", () => {
            const iframe = document.querySelector(iframeSelector);

            if (!isIframe(iframe)) {
                no(new Error(`Provided selector ${iframeSelector} doesn't yield an iframe`));
            }

            // iframe is returned by query selector therefore is in DOM
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            ok((iframe as HTMLIFrameElement).contentWindow!);
        });
    });
};
