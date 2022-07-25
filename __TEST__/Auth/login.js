const request = require("supertest");
const app = require("../../server");
const bcrypt = require("bcrypt");
const { User } = require("../../app/models");

// Seller Account
const roleSeller = "seller";
const nameSeller = "Seller Testing2";
const emailSeller = "seller_testing2@binar.com";
const passwordSeller = bcrypt.hashSync("password", 8);
const passwordNewSeller = bcrypt.hashSync("pass", 8);
const nameSeller3 = "Seller Testing3";

const citySeller = "jakarta";
const addressSeller = "jl.jakarta";
const phoneSeller = "0812345678";
const imageSeller = "image.png";

const emailNotRegister = "testNotResgister@binar.comm";
const passwordNotRegister = "randomPassword";
const passwordEmpty = "null";

let bearerToken = "";

describe("POST /login", () => {
  // test login Buyer success
  it("should return 200 OK", async () => {
    const response = await request(app).post("/api/v1/login").send({
      email: emailSeller,
      password: "password",
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: true,
      message: "Login successfully!",
      accessToken: response.body.accessToken,
    });
  });

  // test login failed wrong email and password
  it("should return 400 Bad Request", async () => {
    const response = await request(app).post("/api/v1/login").send({
      email: emailNotRegister,
      password: passwordNotRegister,
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Email is not registered!",
    });
  });

  // test login failed wrong password
  it("should return 400 Bad Request", async () => {
    const response = await request(app).post("/api/v1/login").send({
      email: emailSeller,
      password: passwordNotRegister,
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Password is incorrect!",
    });
  });

  // test login failed wrong email
  it("should return 400 Bad Request", async () => {
    const response = await request(app).post("/api/v1/login").send({
      email: emailNotRegister,
      password: passwordNotRegister,
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Email is not registered!",
    });
  });
});
