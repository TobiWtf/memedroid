import Client from './Client'
import { Profile } from './Profile'

export class Comment {
    public comment_data: {[key: string]: any}
    public client: Client
    public author: Profile

    constructor(client: Client, comment_data: {[key: string]: any}) {
        //super({client: client})
        this.client = client
        this.comment_data = comment_data
        this.author = new Profile(this.client, this.comment_data.username)
    }

    public async like() {
        console.log(this.comment_data)
        return (await this.client.request({
            url: '/comments/rate_comment',
            method: 'POST',
            data: this.client.data({
                comment_id: this.comment_data.id,
                vote: 1
            })
        })).data
    }

    public async dislike() {
        return (await this.client.request({
            url: '/comments/rate_comment',
            method: 'POST',
            data: this.client.data({
                comment_id: this.comment_data.id,
                vote: 0
            })
        })).data
    }

}