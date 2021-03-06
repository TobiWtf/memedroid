import Client from './Client'

export class Misc {
    public client: Client

    constructor(client: Client) {
        this.client = client
    }

    public async get_app_status(): Promise<{[key:  string]: any} | undefined> {
        return (await this.client.request({
            url: '/misc/get_app_status',
            method: "POST"
        })).data
    }

    public async ping(): Promise<{[key: string]:  any} | undefined> {
        return (await this.client.request({
            url: '/misc/ping',
            method: "POST"
        })).data
    }
}