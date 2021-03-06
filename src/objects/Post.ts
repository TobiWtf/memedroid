
import Client from './Client'
import { get_comment_threads_opts } from '../types/Post'
import { Comment } from './Comment'

export class Post {
    public post_data: {[key: string]: any}
    public client: Client

    constructor(client: Client, post_data: {[key: string]: any}) {
        this.client = client
        this.post_data = post_data
    }

    public async like(): Promise<{[key: string]: any}> {
        return (await this.client.request({
            url: "/item/rate_item",
            method: 'POST',
            data: this.client.data({
                item_id: this.post_data.id,
                vote: 1
            })
        })).data
    }    
    
    public async dislike(): Promise<{[key: string]: any}> {
        return (await this.client.request({
            url: "/item/rate_item",
            method: 'POST',
            data: this.client.data({
                item_id: this.post_data.id,
                vote: 0
            })
        })).data
    }

    public async send_comment(comment: string) {
        return (await this.client.request({
            url: '/comments/send_comment',
            method: 'POST',
            data: this.client.data({
                item_id: this.post_data.id,
                comment: comment
            })
        }))
    }

    public async get_comments(opts: get_comment_threads_opts) {
        let comments: any = []
        let data = (await this.client.request({
            url: '/comments/get_comment_threads',
            method: 'POST',
            data: this.client.data({
                item_id: this.post_data.id,
                quantity: 100,
                start: 0,
                order: 'rating',
                ...opts
            })
        })).data
        if (!data.comments) {
            throw new Error('Issue getting comments')
        } 
        data.comments.forEach((comment: any) => {
            comments.push(new Comment(this.client, comment))
        });
        return comments
    }


}  