const request = require("supertest");
const app = require("../../../server");

const emailRegister = "user_testing@binar.com";
const passwordRegister = "password";
const emailNotRegister = "testNotResgister@binar.comm";
const passwordNotRegister = "randomPassword";

beforeEach(async () => {
  return await request(app).post("/api/v1/register").send({
    role: "buyer",
    name: "login testing",
    email: emailRegister,
    password: passwordRegister,
    status: "active",
    registeredVia: "auth-form",
    emailVerifiedAt: new Date(),
    createAt: new Date(),
    updateAt: new Date(),
  });
});

describe("POST /login", () => {
  // test login success
  it("should return 200 OK", async () => {
    const response = await request(app).post("/api/v1/login").send({
      email: emailRegister,
      password: passwordRegister,
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
      email: emailRegister,
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
      password: passwordRegister,
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Email is not registered!",
    });
  });
});

afterEach(async () => {
  return await request(app).delete("/api/v1/user").send({
    email: emailRegister,
  });
});
