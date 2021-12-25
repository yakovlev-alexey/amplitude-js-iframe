import type { AmplitudeIframeClient } from "./amplitude-iframe-client";

export type Instances = Record<string, AmplitudeIframeClient>;

export type MessagePort = Window | ServiceWorker | globalThis.MessagePort;

export type MessageType = "init" | "event" | "properties" | "id";

export type MessagePayload = Record<string, unknown>;

export type PortMessageType = "initialized";
