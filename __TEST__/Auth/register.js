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

describe("POST /register", () => {
  // register seller test
  it("should return 201 Created", async () => {
    const response = await request(app).post("/api/v1/register").send({
      role: "SELLER",
      name: "Seller Testing1",
      email: "seller_testing1@binar.com",
      password: "password",
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      status: expect.any(Boolean),
      message: expect.any(String),
      data: expect.any(Object),
    });
  });
  afterAll(async () => {
    await User.destroy({ where: { email: "seller_testing1@binar.com" } });
  });

  // register vaidate email seller test
  beforeEach(async () => {
    return await request(app).post("/api/v1/register").send({
      role: roleSeller,
      name: nameSeller,
      email: emailSeller,
      password: passwordSeller,
      status: "active",
      city: citySeller,
      address: addressSeller,
      phone: phoneSeller,
      image: imageSeller,
      registeredVia: "auth-form",
      emailVerifiedAt: new Date(),
      createAt: new Date(),
      updateAt: new Date(),
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Email is already registered!",
    });
  });

  // register password required
  it("should return 400 Bad Request", async () => {
    const response = await request(app).post("/api/v1/register").send({
      role: roleSeller,
      name: nameSeller3,
      email: "validate_error@binar.com",
      password: "",
      status: "active",
      registeredVia: "auth-form",
      emailVerifiedAt: new Date(),
      createAt: new Date(),
      updateAt: new Date(),
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Password is required",
    });
  });

  // register password must be at least 8 characters test
  it("should return 400 Bad Request", async () => {
    const response = await request(app).post("/api/v1/register").send({
      role: roleSeller,
      name: nameSeller3,
      email: "validate_error@binar.com",
      password: "pass",
      status: "active",
      registeredVia: "auth-form",
      emailVerifiedAt: new Date(),
      createAt: new Date(),
      updateAt: new Date(),
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Password must be at least 8 characters",
    });
  });
});

