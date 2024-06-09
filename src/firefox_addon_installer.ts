import { FirefoxRDPAddonActor } from "firefox_types";
import * as remote from "./firefox_remote";

export class FirefoxAddonInstaller {
  constructor(private readonly debuggingServerPort: number) {}

  async install(path: string): Promise<FirefoxRDPAddonActor> {
    const client = await remote.connect(this.debuggingServerPort);
    let response = await client.installTemporaryAddon(path);

    let result = await client.getInstalledAddon(response.addon.id);

    return result;
  }
}
