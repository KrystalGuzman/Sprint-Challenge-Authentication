const request = require("supertest");
const server = require("../api/server");

describe("Tests are working.", () => {
    test("tests run", () => {
        expect(true).toBe(true);
    })
});

// Jokes endpoint tests

describe("GET /api/jokes", () => {
    it("should return a 400 status code when viewing before logging in", () => {
        return request(server)
            .get("/api/jokes")
            .then(response => {
                expect(response.status).toBe(400);
            })
    })
    it("should return an error message when viewing before logging in", () => {
        return request(server)
            .get("/api/jokes")
            .then(response => {

                console.log(response.text);

                expect(response.text).toBe(`{"message":"You must log in first to view this resource."}`);
            })
    })
});


describe("GET /api/jokes", () => {
    test("should return a 400 status code when viewing with invalid credentials", () => {
        return request(server)
            .get("/api/jokes")
            .set("header", {"Authorization": "none"})
            .then(response => {
                expect(response.status).toBe(400);
            })
    })
});