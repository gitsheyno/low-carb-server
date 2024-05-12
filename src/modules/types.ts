export type User = {
    id: string;
    createdAT: Date;
    username: string;
    password: string;
}

export type UserRequest = {
    username: string;
    password: string;
}