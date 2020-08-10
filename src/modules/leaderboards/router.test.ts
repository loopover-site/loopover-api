import request from "supertest";

import { expect } from "chai";

import { server } from "../..";

import SubmitBody from "./types/SubmitBody";

const agent = request.agent(server);

const newSolve: SubmitBody<"5x5"> = {
    category: "5x5",
    subCategory: "regular",
    time: 12.345,
    evidence: "google.com",
    username: "blah"
}

describe("Leaderboards router", () => {
    it("Adds a solve", async () => {
        const response = await agent
            .post("/api/leaderboards/submit")
            .send(newSolve)
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body).to.deep.equal({
            message: "Successfully submitted solve"
        });
    });
    it("Gets leaderboards", async () => {
        const response = await agent
            .get("/api/leaderboards")
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body.length).to.deep.equal(1);
    });
    it("Updates a solve", async () => {
        await agent
            .post("/api/leaderboards/submit")
            .send({...newSolve, time: 10})
            .set("Accept", "application/json")
            .expect(200);

        const response = await agent
            .get("/api/leaderboards")
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body[0].time).to.equal(10);
    });
    it("Doesn't update a solve if it's slow", async () => {
        await agent
            .post("/api/leaderboards/submit")
            .send({...newSolve, time: 15})
            .set("Accept", "application/json")
            .expect(400);

        const response = await agent
            .get("/api/leaderboards")
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body[0].time).to.equal(10);
    });
});
