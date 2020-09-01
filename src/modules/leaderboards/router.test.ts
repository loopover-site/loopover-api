import request from "supertest";

import { expect } from "chai";

import { server } from "../..";

import SubmitBody from "./types/SubmitBody";

const agent = request.agent(server);

const newSolve: SubmitBody<"5x5"> = {
    category: "5x5",
    subCategory: "regular",
    time: 12345,
    evidence: "google.com",
    username: "blah"
}

describe("Leaderboards router", () => {
    it("Adds a solve into the queue", async () => {
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
        expect(response.body.length).to.deep.equal(3);
    });
    it("Gets leaderboards by category", async () => {
        const response = await agent
            .get("/api/leaderboards/5x5")
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body.length).to.deep.equal(2);
    });
    it("Gets leaderboards", async () => {
        const response = await agent
            .get("/api/leaderboards/5x5/regular")
            .set("Accept", "application/json")
            .expect(200);

        expect(response.body.length).to.deep.equal(1);
    });
    it("Gets the queue", async () => {
        const response = await agent
            .get("/api/leaderboards/queue")
            .set("Accept", "application/json")
            .expect(200);

        console.log(response.body);

        expect(response.body.queue.length).to.equal(1);
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

        expect(response.body[response.body.length - 1].time).to.equal(10);
    });
});
