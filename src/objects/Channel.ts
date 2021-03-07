import Client from './Client'

export class Channel {
    public client: Client
    public id: Number

    constructor(client: Client, channel_id: Number) {
        this.client = client
        this.id = channel_id
    }

    public async send(message: string) {
        return (await this.client.request({
            url: '/chat/send_message_to_room',
            method: 'POST',
            data: this.client.data({
                room_id: this.id,
                message: message
            })
        })).data
    }

    public async get_previous_messages() {

    }

}