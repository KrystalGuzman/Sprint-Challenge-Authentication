const request = require("supertest");
const server = require("../api/server");

describe("Tests are working.", () => {
    it("tests run", () => {
        expect(true).toBe(true);
    })
});

// Register endpoint tests

describe("POST /api/auth/register", () => {
    it("should return a 400 status code for missing username and missing password", () => {
        return request(server)
            .post("/api/auth/register")
            .send("bad data")
            .then(response => {
                expect(response.status).toBe(400);
            })
    })
    it("should return a 400 status code for missing password", () => {
        return request(server)
            .post("/api/auth/register")
            .send({username: "one"})
            .then(response => {
                expect(response.status).toBe(400);
            })
    })
    it("should return a 400 status code for a username already in use", () => {
        return request(server)
            .post("/api/auth/register")
            .send({username: "one", password: "new password"})
            .then(response => {
                expect(response.status).toBe(400);
            })
    })
});


// Login endpoint tests

describe("POST /api/auth/login", () => {
    it("should return a 400 status code for missing username and missing password", () => {
        return request(server)
            .post("/api/auth/login")
            .send("bad data")
            .then(response => {
                expect(response.status).toBe(400);
            })
    })
    it("should return a 400 status code for missing password", () => {
        return request(server)
            .post("/api/auth/login")
            .send({username: "one"})
            .then(response => {
                expect(response.status).toBe(400);
            })
    })
    it("should return a 400 status code for invalid credentials", () => {
        return request(server)
            .post("/api/auth/login")
            .send({username: "one", password: "password"})
            .then(response => {
                expect(response.status).toBe(401);
            })
    })
});