import { AxiosPromise } from 'axios';
import Client from './Client'

export class Misc extends Client {
    constructor(client: Client) {
        super({client: client})
    }

    public async get_app_status(): Promise<{[key:  string]: any} | undefined> {
        return (await this.request({
            url: '/misc/get_app_status',
            method: "POST"
        })).data
    }

    public async ping(): Promise<{[key: string]:  any} | undefined> {
        return (await this.request({
            url: '/misc/ping',
            method: "POST"
        })).data
    }
}