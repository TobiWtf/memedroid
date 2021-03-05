import { AxiosPromise } from 'axios'
import Client from './Client'
import { GTIOpts } from '../types/Items'

export class Item extends Client {
    constructor(client: Client) {
        super ({client: client})
    }
    
    public async get_top_items(opts: GTIOpts): Promise<{[key: string]: any | undefined}> {
        return (await this.request({
            url: '/item/get_top_items',
            method: 'POST',
            data: this.data({
                language: 1,
                ...opts
            })
        })).data
    }
}