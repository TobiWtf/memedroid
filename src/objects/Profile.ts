import { Channel } from './Channel'
import Client from './Client'

export class Profile {
    public profile_data: {[key: string]: any}
    public client: Client
    public profile_name: string

    constructor(client: Client, profile_name: string) {
        this.client = client
        this.profile_name = profile_name
        this.profile_data = {}
    }

    public async get(opts: any = {}) {
        this.profile_data = (await this.client.request({
            url: '/user_profile/get_user_profile',
            method: 'POST',
            data: this.client.data({
                username: this.profile_name,
                ...opts
            })
        }))
    }

    //Add quanity: Number, and Start: Number
    public async get_user_uploaded_items(opts: any = {}) {
        return (await this.client.request({
            url: '/item/get_user_uploaded_items',
            method: 'POST',
            data: this.client.data({
                username: this.profile_name,
                ...opts
            })
        }))
    }

    //Add quanity, offset
    public async get_user_followers(opts: any = {}) {
        let users: Array<Profile> = []
        let data = (await this.client.request({
            url: '/subscriptions/get_user_followers',
            method: 'POST',
            data: this.client.data({
                username: this.profile_name,
                ...opts
            })
        })).data
        if (!data.users) {
            throw new Error('Error getting followers')
        } 
        data.users.forEach((user: any) => {
            users.push(new Profile(this.client, user.username))
        });
        return users
    }

    //Do same as method above
    public async get_users_followed_by_user(opts: any = {}) {
        let users: Array<Profile> = []
        let data = (await this.client.request({
            url: '/subscriptions/get_users_followed_by_user',
            method: 'POST',
            data: this.client.data({
                username: this.profile_name,
                ...opts
            })
        })).data
        if (!data.users) {
            throw new Error('Error getting followers')
        } 
        data.users.forEach((user: any) => {
            users.push(new Profile(this.client, user.username))
        });
        return users
    }

    public async follow() {
        return (await this.client.request({
            url: '/subscriptions/follow_user',
            method: 'POST',
            data: this.client.data({
                username: this.profile_name
            })
        }))
    }

    public async unfollow() {
        return (await this.client.request({
            url: '/subscriptions/unfollow_user',
            method: 'POST',
            data: this.client.data({
                username: this.profile_name
            })
        }))
    }

    //Return channel
    public async send_chat(message: string) {
        return new Channel(this.client, (await this.client.request({
            url: '/chat/send_message_to_user',
            method: 'POST',
            data: this.client.data({
                username: this.profile_name,
                message: message
            })
        })).data.room_id)
    }

    //Make chat class, then start making chat lib, This will take a long time
    public async get_chat_room_with_user() {
        return (await this.client.request({
            url: '/chat/get_room_with_user',
            method: 'GET',
            data: this.client.data({
                username: this.profile_name
            })
        })).data
    }
}