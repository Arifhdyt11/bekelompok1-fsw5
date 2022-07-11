const request = require("supertest");
const app = require("../../../server");

const emailRegister = "user_testing@binar.com";
const passwordRegister = "password";

let bearerToken;
// login and set bearer token
beforeAll(async () => {
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
beforeEach(async () => {
  const login = await request(app).post("/api/v1/login").send({
    email: emailRegister,
    password: passwordRegister,
  });

  bearerToken = login.body.accessToken;

  return bearerToken;
});
// update password test
describe("PUT /change-password", () => {
  // test update password success
  it("should return 200 OK", async () => {
    const response = await request(app)
      .put("/api/v1/change-password")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        oldPassword: passwordRegister,
        password: "new password",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: true,
      message: "Successfully change password!",
    });
  });
  // test update password failed wrong old password
  it("should return 400 Bad Request", async () => {
    const response = await request(app)
      .put("/api/v1/change-password")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        oldPassword: "wrong password",
        password: "new password",
      });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      status: false,
      message: "Password is incorrect",
    });
  });
  // test update password failed wrong new password
  it("should return 400 Bad Request", async () => {
    const response = await request(app)
      .put("/api/v1/change-password")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        oldPassword: passwordRegister,
        password: "",
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "New password is required!",
    });
  });
  // test update password failed must be at least 8 characters
  it("should return 400 Bad Request", async () => {
    const response = await request(app)
      .put("/api/v1/change-password")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        oldPassword: passwordRegister,
        password: "1234567",
      });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "New password must be at least 8 characters",
    });
  });
});
afterAll(async () => {
  return await request(app).delete("/api/v1/user").send({
    email: emailRegister,
  });
});
afterEach(async () => {
  return (bearerToken = null);
});
