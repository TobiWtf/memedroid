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
}