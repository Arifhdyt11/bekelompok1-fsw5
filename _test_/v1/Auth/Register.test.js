const request = require("supertest");
const app = require("../../../server");

// Buyer Account
const roleBuyer = "buyer";
const nameBuyer = "Buyer Testing";
const emailBuyer = "buyer_testing@binar.com";
const passwordBuyer = "password";

// Seller Account
const roleSeller = "seller";
const nameSeller = "Seller Testing";
const emailSeller = "seller_testing@binar.com";
const passwordSeller = "password";

describe("POST /register", () => {
  // test register success
  it("should return 200 Created", async () => {
    const response = await request(app).post("/api/v1/register").send({
      role: roleBuyer,
      name: nameBuyer,
      email: emailBuyer,
      password: passwordBuyer,
      status: "active",
      registeredVia: "auth-form",
      emailVerifiedAt: new Date(),
      createAt: new Date(),
      updateAt: new Date(),
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: true,
      message: "User has been created!",
      data: expect.any(Object),
    });
  });

  // register seller test
  it("should return 200 Created", async () => {
    const response = await request(app).post("/api/v1/register").send({
      role: roleSeller,
      name: nameSeller,
      email: emailSeller,
      password: passwordSeller,
      status: "active",
      registeredVia: "auth-form",
      emailVerifiedAt: new Date(),
      createAt: new Date(),
      updateAt: new Date(),
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: true,
      message: "User has been created!",
      data: expect.any(Object),
    });
  });

  // register vaidate email buyer test
  it("should return 400 Bad Request", async () => {
    const response = await request(app).post("/api/v1/register").send({
      role: roleBuyer,
      name: nameBuyer,
      email: emailBuyer,
      password: passwordBuyer,
      status: "active",
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
  // register vaidate email seller test
  it("should return 400 Bad Request", async () => {
    const response = await request(app).post("/api/v1/register").send({
      role: roleSeller,
      name: nameSeller,
      email: emailSeller,
      password: passwordSeller,
      status: "active",
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
  // register password required test
  it("should return 400 Bad Request", async () => {
    const response = await request(app).post("/api/v1/register").send({
      role: roleBuyer,
      name: nameBuyer,
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
      role: roleBuyer,
      name: nameBuyer,
      email: "validate_error@binar.com",
      password: "1234567",
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

afterAll(async () => {
  const deleteBuyer = await request(app).delete("/api/v1/user").send({
    email: emailBuyer,
  });

  const deleteSeller = await request(app).delete("/api/v1/user").send({
    email: emailSeller,
  });

  return deleteBuyer && deleteSeller;
});
