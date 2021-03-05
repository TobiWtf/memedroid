export interface Client {
    [key: string]: any,
    username: string,
    password: string,
    device_id: string,
    version_code: string,
    OS: string
}

export interface ClientOpts {
    [key: string]: any,
    username: string,
    password: string,
    device_id?: string,
    version_code?: string,
    OS?: string
}