import { Gateway, GatewayEventHandler } from '../index.ts'
import cache from '../../models/cache.ts'
import { TextChannel } from '../../structures/textChannel.ts'
import { ChannelPayload } from "../../types/channelTypes.ts"

export const channelPinsUpdate: GatewayEventHandler = (
  gateway: Gateway,
  d: any
) => {
  const after: TextChannel = gateway.client.channels.get(d.channel_id)
  if (after !== undefined) {
    const before = after.refreshFromData({
      last_pin_timestamp: d.last_pin_timestamp
    })
    let raw = gateway.client.channels._get(d.channel_id) as ChannelPayload;
    gateway.client.channels.set(after.id, Object.assign(raw, { last_pin_timestamp: d.last_pin_timestamp }))
    gateway.client.emit('channelPinsUpdate', before, after)
  }
}
