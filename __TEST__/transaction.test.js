const request = require("supertest");
const { login } = require("../app/controllers/api/v1/auth/userController");
const app = require("../server");
const jwt_decode = require("jwt-decode");
const { response } = require("../server");

let bearerToken;

describe("/api/v1/transaction/seller", () => {
  beforeAll(async () => {
    loginUser = await request(app).post("/api/v1/login").send({
      email: "seller1@binar.com",
      password: "password",
    });
    bearerToken = loginUser.body.accessToken;
    console.log(bearerToken);
    // console.log(loginUser);
    decoded = jwt_decode(bearerToken);

    console.log(decoded);
    // const { id } = login.body.accessToken;
    // console.log(id);
  });

  //Get ALL Data Transaction
  it("Get transaction with status code 200", async () =>
    request(app)
      .get("/api/v1/transaction")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        console.log(response.body);
        expect(response.body).toEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
          data: expect.any(Array),
        });
      }));

  //Get All Transaction By seller
  it("Get transaction with status code 200", async () =>
    request(app)
      .get("/api/v1/transaction/seller")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        console.log(response.body);
        expect(response.body).toEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
          data: expect.any(Array),
        });
      }));

  //Get Detail Transaction By seller
  it("Get transaction with status code 200", async () =>
    request(app)
      .get("/api/v1/transaction/seller/6")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        console.log(response.body);
        expect(response.body).toEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
          data: expect.any(Array),
        });
      }));
});
