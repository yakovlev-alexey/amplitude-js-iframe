import type { Config } from "amplitude-js";

import { DEFAULT_INSTANCE_ID, DEFAULT_POLLING_INTERVAL_MS } from "./constants";

import type {
  MessageType,
  Instances,
  MessagePort,
  PortMessageType,
  MessagePayload,
} from "./types";

export class AmplitudeIframeClient {
  private constructor(instanceId: string) {
    this._instanceId = instanceId;
  }

  public static getInstance(id: string) {
    const instanceId =
      typeof id === "string" && Boolean(id)
        ? id.toLowerCase()
        : DEFAULT_INSTANCE_ID;

    const client = this._instances[instanceId];

    if (client) {
      return client;
    }

    return (this._instances[instanceId] = new AmplitudeIframeClient(
      instanceId
    ));
  }

  public init(
    port: MessagePort,
    apiKey: string,
    userId?: string,
    config?: Config
  ) {
    if (this._isInitialized) {
      console.error(`Client "${this._instanceId}": already initialized`);
      return;
    }

    if (!port) {
      console.error(
        `Client "${this._instanceId}": port or iframe id is required`
      );
      return;
    }

    if (typeof apiKey !== "string" || !apiKey) {
      console.error(`Client "${this._instanceId}": apiKey is required`);
      return;
    }

    this._port = port;

    this._waitForInitialization(apiKey, userId, config);
  }

  public setUserId(userId: string) {
    if (!this._isInitialized) {
      this._queue.push(["id", { userId }]);
      return;
    }

    this._postMessage("id", { userId });

    this._clearQueue();
  }

  public setUserProperties(properties: Record<string, unknown>) {
    if (!this._isInitialized) {
      this._queue.push(["properties", { properties }]);
      return;
    }

    this._postMessage("properties", { properties });

    this._clearQueue();
  }

  public logEvent(event: string, additional: Record<string, unknown>) {
    if (!this._isInitialized) {
      this._queue.push(["event", { event, additional }]);
      return;
    }

    this._postMessage("event", { event, additional });

    this._clearQueue();
  }

  private _waitForInitialization(
    apiKey: string,
    userId?: string,
    config?: Config
  ) {
    this._postMessage("init", { userId, apiKey, config });

    const initializedInterval = setInterval(() => {
      this._postMessage("init", { userId, apiKey, config });
    }, DEFAULT_POLLING_INTERVAL_MS);

    const handleInitialized = (
      event: MessageEvent<{ type: PortMessageType }>
    ) => {
      const isInitializeEvent =
        this._port === event.source && event.data.type === "initialized";

      if (!this._isInitialized && !isInitializeEvent) {
        return;
      }

      this._isInitialized = true;
      clearInterval(initializedInterval);
      window.removeEventListener("message", handleInitialized);
    };

    window.addEventListener("message", handleInitialized);
  }

  private _postMessage(type: MessageType, payload: MessagePayload) {
    this._port?.postMessage({ type, payload });
  }

  private _clearQueue() {
    while (this._queue.length) {
      const [eventType, payload] = this._queue.pop()!;

      this._postMessage(eventType, payload);
    }
  }

  private static _instances: Instances = {};

  private _instanceId: string;
  private _isInitialized: boolean = false;
  private _port: MessagePort | null = null;
  private _queue: [MessageType, Record<string, unknown>][] = [];
}
