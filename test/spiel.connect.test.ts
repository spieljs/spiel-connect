import { expect } from "chai";
import { Connect, IRequestConfigConnect } from "../src";
import { IServerTest } from "./server.types";

describe("Connect", () => {
    let endpoints: IServerTest;
    before(async () => {
        const request: IRequestConfigConnect = {
            domain: "http://localhost:3000",
        };
        endpoints = await new Connect(request).getEndpoints();
    });

    it("has to recive all the routes", () => {
        expect(Object.keys(endpoints)).has.to.length(2);
        expect(Object.keys(endpoints)[0]).has.to.be.equal("User");
        expect(Object.keys(endpoints.User)).has.to.length(5);
        expect(Object.keys(endpoints)[1]).has.to.be.equal("Greeting");
        expect(Object.keys(endpoints.Greeting)).has.to.length(2);
    });

    it("has to exist response from greeting endpoint", async () => {
        const response = await endpoints.Greeting.getGreeting();
        expect(response.greet).has.to.be.equal("Bye");
    });

    it("has to exist response from greeting endpoint by query", async () => {
        const query = { greet: "Bye"};
        const response = await endpoints.Greeting.getGreetingByQuery(null, null, query);
        expect(response.greet).has.to.be.equal("Bye");
    });

    it("has to return the user with id 1", async () => {
        const user = {id: 1};
        const response = await endpoints.User.getUser(user);
        expect(response.id).has.to.equal(1);
        expect(response.name).has.to.equal("Millie");
        expect(response.permission).has.to.equal("root");
    });

    it("has to add an user", async () => {
        const user = {
            id: 5,
            name: "Pepe",
            permission: "user",
        };

        const response = await endpoints.User.addUser(null, user);
        expect(response).has.to.length(5);
        expect(response[4].id).has.to.equal(5);
        expect(response[4].name).has.to.equal("Pepe");
        expect(response[4].permission).has.to.equal("user");
    });

    it("has to update the user", async () => {
        const user = {id: 5};
        const permission = { permission: "root"};

        const response = await endpoints.User.updateUser(user, permission);
        expect(response[4].permission).has.to.equal("root");
    });

    it("has to delete the user", async () => {
        const user = {id: 5};

        const response = await endpoints.User.deleteUser(user);
        expect(response).has.to.length(4);
    });
});
