const request = require("supertest");
const { login } = require("../app/controllers/api/v1/auth/userController");
const app = require("../server");
const jwt_decode = require("jwt-decode");
const { response } = require("../server");
const { Transaction } = require("../app/models");

let bearerToken;
let decoded;

describe("/api/v1/transaction/buyer", () => {
  beforeAll(async () => {
    //buyer
    loginUser = await request(app).post("/api/v1/login").send({
      email: "buyer1@binar.com",
      password: "password",
    });
    bearerToken = loginUser.body.accessToken;
    console.log(bearerToken);
    decoded = jwt_decode(bearerToken);
    console.log(decoded);
  });

  it("should return 201 status code and create data transaction", async () => {
    const res = await request(app)
      .post("/api/v1/transaction")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        productsizeId: 3,
        priceBid: "110000",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Product was already in transaction");
    expect(res.body.data).toBeDefined();
  });

  it("Get buyer by id Transaction with status code 200", async () =>
    request(app)
      .get("/api/v1/transaction/buyer/1")
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
  it("Get transaction buyer Transaction with status code 200", async () =>
    request(app)
      .get("/api/v1/transaction/buyer")
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

  // afterAll(async () => {
  //   await Transaction.destroy({ where: { productsizeId: "5" } });
  // });
});

describe("/api/v1/transaction/seller", () => {
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
