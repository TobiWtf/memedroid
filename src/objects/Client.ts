import { EventEmitter } from 'events'
import { Client, ClientOpts } from '../types/Client'
import axios, { AxiosPromise } from 'axios'


export default class client extends EventEmitter implements Client {
    public username: string | undefined
    public password: string | undefined
    public version_code: string
    public device_id: string
    public token: string | undefined
    public OS: string
    public metadata: any
    public client: client
    public language: string
    public Misc?: any 
    public Item?: any
    private root: string = 'https://appv2.memedroid.com'

    constructor(opts: ClientOpts) {
        super()
        this.client = this//opts.client || this;
        if (this.client.token) {
            this.token = this.client.token
        }
        this.username = opts.username
        this.password = opts.password
        this.device_id = opts.device_id || '0000000000000000000000000000000000000000000000000000000000000000'
        this.version_code = opts.version_code || '114145616'
        this.OS = opts.OS || "1"
        this.language = opts.language || "en"
        this.metadata = {update(object: {[key: string]: any}) {Object.assign(this, object)}}
    }

    private serialize_query_string(object: any): string {
        return `${Object.keys(object).map(key=>{
            return `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
        }).join('&')}`
    }

    public access(): {[key: string]: string | undefined} {
        if (!this.token) {
            return {
                username: this.client.username, password: this.client.password
            }
        } else return {
            accessToken: this.token, 
            access_token: this.token
        }
    }

    public data(object: any = {}) {
        return this.serialize_query_string({
            OS: this.OS,
            device_id: this.device_id, 
            version_code: this.version_code,
            language: this.language,
            ...object,
            ...this.client.access()
        })
    }

    public async request(opts: any): Promise<AxiosPromise> {
        if (!opts.data) {
            opts.data = this.data()
        }
        return await axios({
            baseURL: this.root,
            ...opts
        })
    }

    public async login(): Promise<{[key: string]: any | void}> {
        let data = (await this.request({
            url: '/secure/user/login_by_username',
            method: 'POST',
            data: this.client.data()
        })).data
        if (data.login_info) {
            this.token = data.login_info.access_token
            this.client.metadata.update(data.login_info)
            this.client.emit("ready")
            return data
        } else throw new Error(`Could not login, data is as follows ${data.toString()}`)
    }
}