import request from "supertest";

import { expect } from "chai";

import { server } from "../..";

import users from "../../../prisma/examples/users";
import { seed } from "../../../prisma/prisma";

const agent = request.agent(server);

describe("Auth router", () => {
    before(async function () {
        this.timeout(20000);
        await seed();
    });

    it("Logs-in a user", async () => {
        const { username, password } = users[0];

        const response = await agent
            .post(`/api/auth/login`)
            .send({ username, password })
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body).to.deep.equal({
            message: "Successfully log in",
            user: { username, role: "admin", id: 1 }
        });
    });

    it("Logs-out a user", async () => {
        const response = await agent
            .get(`/api/auth/logout`)
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body.message).to.equal("Successfully logged out");
    });
});
