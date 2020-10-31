import { Client } from "../models/client.ts";
import { Channel } from "../structures/channel.ts";
import { User } from "../structures/user.ts";
import { ChannelPayload } from "../types/channelTypes.ts";
import { CHANNEL } from "../types/endpoint.ts";
import { BaseManager } from "./BaseManager.ts";

export class ChannelsManager extends BaseManager<ChannelPayload, Channel> {
  constructor(client: Client) {
    super(client, "channels", User)
  }

  // Override get method as Generic
  get<T = Channel>(key: string): T {
    return new this.dataType(this.client, this._get(key)) as any
  }

  fetch(id: string) {
    return new Promise((res, rej) => {
      this.client.rest.get(CHANNEL(id)).then(data => {
        this.set(id, data as ChannelPayload)
        res(new Channel(this.client, data as ChannelPayload))
      }).catch(e => rej(e))
    })
  }
}