import ClientClass from '../objects/Client'

export interface Client {
    [key: string]: any,
    username: string | undefined,
    password: string | undefined
    device_id: string,
    version_code: string,
    OS: string,
    language: string,
    client: ClientClass
}

export interface ClientOpts {
    [key: string]: any,
    username?: string | undefined,
    password?: string | undefined,
    device_id?: string,
    version_code?: string,
    OS?: string,
    language?: string,
    client?: ClientClass
}