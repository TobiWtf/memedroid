import { AxiosPromise } from 'axios';
import client from './Client';
import Client from './Client'

export class App extends Client {
    constructor(client: client) {
        super({
            username: client.username, 
            password: client.password
        }, client)
    }

    public get_app_status(): Promise<AxiosPromise> {
        return this.request({
            url: '/misc/get_app_status',
            method: "POST"
        })
    }

    public ping(): Promise<AxiosPromise> {
        return this.request({
            url: '/misc/ping',
            method: "POST"
        })
    }
}