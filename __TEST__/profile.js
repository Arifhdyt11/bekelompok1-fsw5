const request = require("supertest");
const app = require("../server");
const bcrypt = require("bcrypt");
const { User } = require("../app/models");
const jwt_decode = require("jwt-decode");

let bearerToken;
let decoded;
// profile tests
describe("GET /profile", () => {
  beforeAll(async () => {
    loginUser = await request(app).post("/api/v1/login").send({
      email: "seller1@binar.com",
      password: "password",
    });
    bearerToken = loginUser.body.accessToken;
    console.log(bearerToken);
    decoded = jwt_decode(bearerToken);

    console.log(decoded);
  });

  // test get profile success
  it("should return 200 OK", async () => {
    const response = await request(app)
      .get("/api/v1/profile")
      .set("Authorization", `Bearer ${bearerToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: true,
      message: "Successfully find data user",
      data: expect.any(Object),
    });
  });

  // test get profile failed
  it("should return 401 Unauthorized", async () => {
    const response = await request(app).get("/api/v1/profile");
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });

  it("should response with 401 Invalid Token", async () => {
    return request(app)
      .get("/api/v1/profile")
      .set("Authorization", `Bearer ${"invalidtoken"}`);
    expect(response.statusCode).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid Token",
    });
  });
});
