import Client from './Client';

export class Chat {
    public client: Client
    //Add check for timeout to opts type
    constructor(client: Client, opts={}) {
        this.client = client
    }
}