const request = require("supertest");
const app = require("../../../server");

const emailRegister = "user_testing@binar.com";
const passwordRegister = "password";

let bearerToken = "";
// login and set bearer token
beforeAll(async () => {
  await request(app).post("/api/v1/register").send({
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

  const token = await request(app).post("/api/v1/login").send({
    email: emailRegister,
    password: passwordRegister,
  });

  return (bearerToken = token.body.accessToken);
});
describe("PUT /profile", () => {
  // test update profile success
  it("should return 200 OK", async () => {
    const response = await request(app)
      .put("/api/v1/profile")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        name: "update profile",
        city: "Jakarta",
        address: "Jl. Kebon Kacang",
        phone: "081234567890",
        image: "https://binar.com/image.png",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: true,
      message: "User Updated",
      data: expect.any(Object),
    });
  });
  // test update profile failed
  it("should return 401 Unauthorized", async () => {
    const response = await request(app).put("/api/v1/profile");
    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Unauthorized",
    });
  });
});
afterAll(async () => {
  return await request(app).delete("/api/v1/user").send({
    email: emailRegister,
  });
});
