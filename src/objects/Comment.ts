import Client from './Client'

export class Comment {
    public comment_data: {[key: string]: any}
    public client: Client

    constructor(client: Client, comment_data: {[key: string]: any}) {
        //super({client: client})
        this.client = client
        this.comment_data = comment_data
    }

    public async like() {
        return (await this.client.request({
            url: '/comments/rate_comment',
            method: 'POST',
            data: this.client.data({
                comment_id: this.comment_data.id,
                vote: 1
            })
        }))
    }

}