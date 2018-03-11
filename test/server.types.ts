import { RequestFunction } from "../src"

export interface IUser {
    getUsers: RequestFunction;
    getUser: RequestFunction;
    addUser: RequestFunction;
    updateUser: RequestFunction;
    deleteUser: RequestFunction;
}

export interface IGreeting {
    getGreeting: RequestFunction;
    getGreetingByQuery: RequestFunction;
}

export interface IServerTest {
    User: IUser;
    Greeting: IGreeting;
}