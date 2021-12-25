import { DEFAULT_INSTANCE_ID } from "./constants";

export class AmplitudeIframeClient {
  public static getInstance(id: string) {
    const instanceId =
      typeof id === "string" && Boolean(id)
        ? id.toLowerCase()
        : DEFAULT_INSTANCE_ID;

    const client = this._instances[instanceId];

    return (
      client ?? (this._instances[instanceId] = new AmplitudeIframeClient())
    );
  }

  private static _instances: Record<string | symbol, AmplitudeIframeClient> =
    {};
}
