const request = require("supertest");
const { login } = require("../app/controllers/api/v1/auth/userController");
const app = require("../server");
const jwt_decode = require("jwt-decode");
const { response } = require("../server");
const { Wishlist } = require("../app/models");

let bearerToken;

//BUYER
describe("/api/v1/wishlist/buyer/", () => {
  beforeAll(async () => {
    loginUser = await request(app).post("/api/v1/login").send({
      email: "buyer1@binar.com",
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

  it("should return 201 status code and create data transaction", async () => {
    const res = await request(app)
      .post("/api/v1/wishlist")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        productId: "1",
        userId: "9",
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Wishlist has been added!");
    expect(res.body.data).toBeDefined();
  });

  it("Get  Data wishlist buyer with status code 200", async () =>
    request(app)
      .get("/api/v1/wishlist/buyer")
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

  //Get ALL Data wishlist
  it("Get ALL Data wishlist with status code 200", async () =>
    request(app)
      .get("/api/v1/wishlist")
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

//SELLER
describe("/api/v1/wishlist/seller/", () => {
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

  //Get wishlist by SellerId
  it("Get wishlist with status code 200", async () =>
    request(app)
      .get("/api/v1/wishlist/seller")
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
