import request from "supertest";

import { expect } from "chai";

import { server } from "../..";

const agent = request.agent(server);

describe("Users router", () => {
    it("Gets user games", async () => {
        const response = await agent
            .get("/api/users/games/2")
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body.length).to.deep.equal(2);
    });
});
