const request = require("supertest");
const app = require("../../../server");
const { User } = require("../../../app/models/user");

describe("Register", () => {
  afterAll(async () => {
    await User.destroy({ where: { email: "user_testing@gmail.com" } });
  });

  it("Register with status code 201", () =>
    request(app)
      .post("/api/v1/register")
      .set("Content-Type", "application/json")
      .send({
        role: "BUYER",
        name: "user_testing",
        email: "user_testing@gmail.com",
        password: "password",
      })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({
          status: expect.any(String),
          message: expect.any(String),
          data: expect.any(Object),
        });
        console.log(res.body);
      }));

  //   it("Register with exciting mail status code 422", () =>
  //     request(app)
  //       .post("/v1/register")
  //       .set("Accept", "application/json")
  //       .send({
  //         name: "SELLER A",
  //         email: "user_testing@gmail.com.com",
  //         password: "password",
  //       })
  //       .then((res) => {
  //         expect(res.statusCode).toBe(200);
  //         expect(res.body).toEqual({
  //           error: {
  //             message: expect.any(String),
  //           },
  //         });
  //       }));

  //   it("Register with lengh password error status code 400", () =>
  //     request(app)
  //       .post("/v1/register")
  //       .set("Accept", "application/json")
  //       .send({
  //         name: "SELLER A",
  //         email: "seller1@gmail.com",
  //         password: "password123",
  //       })
  //       .then((res) => {
  //         expect(res.statusCode).toBe(400);
  //         expect(res.body).toEqual({
  //           error: {
  //             message: expect.any(String),
  //           },
  //         });
  //       }));

  //   it("Register with email format error status code 400", () =>
  //     request(app)
  //       .post("/v1/register")
  //       .set("Accept", "application/json")
  //       .send({
  //         name: "SELLER A",
  //         email: "seller1gmail.com",
  //         password: "password",
  //       })
  //       .then((res) => {
  //         expect(res.statusCode).toBe(400);
  //         expect(res.body).toEqual({
  //           error: {
  //             message: expect.any(String),
  //           },
  //         });
  //       }));
});
