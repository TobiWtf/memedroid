    import { EventEmitter } from 'events'
    import { Client, ClientOpts } from '../types/Client'
    import axios from 'axios'

    //Make abstract when creating child classes
    export default class client extends EventEmitter implements Client {
        public username: string
        public password: string
        public version_code: string
        public device_id: string
        public token: Promise<string> | undefined
        public OS: string
        public metadata: any
        private root: string = 'https://appv2.memedroid.com'

        constructor(opts: ClientOpts) {
            super()
            this.username = opts.username
            this.password = opts.password
            this.device_id = opts.device_id || '0000000000000000000000000000000000000000000000000000000000000000'
            this.version_code = opts.version_code || '114145616'
            this.OS = opts.os || "1"
            this.metadata = {update(object: {[key: string]: any}) {Object.assign(this, object)}}
        }

        private serialize_query_string(object: any): string {
            return `${Object.keys(object).map(key=>{
                return `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
            }).join('&')}`
        }

        public data(object: any) {
            return this.serialize_query_string({
                OS: this.OS,
                device_id: this.device_id, 
                version_code: this.version_code,
                ...object
            })
        }

        public async request(opts: any) {
            return await axios({
                baseURL: this.root,
                ...opts
            })
        }

        public async login() {
            let data = (await this.request({
                url: '/secure/user/login_by_username',
                method: 'POST',
                data: this.data({
                    password: this.password,
                    username: this.username
                })
            })).data
            if (data.login_info) {
                this.token = data.login_info.access_token
                this.metadata.update(data.login_info)
                return data
            } else throw new Error(`Could not login, data is as follows ${data.toString()}`)
        }

    }