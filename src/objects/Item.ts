import { AxiosPromise } from 'axios'
import Client from './Client'
import { GTIOpts } from '../types/Items'
import { Post } from './Post'

export class Item  {
    public client: Client

    constructor(client: Client) {
        //super ({client: client})
        this.client = client
    }
    
    public async get_top_items(opts: GTIOpts): Promise<{[key: string]: any | undefined}[]> {
        let posts: any = [];
        let data = (await this.client.request({
            url: '/item/get_top_items',
            method: 'POST',
            data: this.client.data({
                language: 1,
                ...opts
            })
        })).data
        if (!data.items) {
            throw new Error('Issue getting top items')
        }
        data.items.forEach((element: any) => {
            posts.push(new Post(this.client, element))
        });   
        return posts
    }
}