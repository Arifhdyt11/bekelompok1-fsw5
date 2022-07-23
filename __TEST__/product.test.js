const request = require("supertest");
const { login } = require("../app/controllers/api/v1/auth/userController");
const app = require("../server");
const jwt_decode = require("jwt-decode");
const { response } = require("../server");
const { Product } = require("../app/models");

// Seller Account

describe("/api/v1/product", () => {
  let bearerToken;
  let decoded;
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

  //Create Product
  it("Create Product should return 201 created ", async () => {
    return request(app)
      .post("/api/v1/product")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        categoryId: 1,
        name: "canvass",
        price: 5000,
        description: "sonice",
        image: "canvass.png",
      })

      .then((response) => {
        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe("Product added");
        expect(response.body.data).toBeDefined();
      });
  });

  //Get Product
  it("Get product with status code 200", async () =>
    request(app)
      .get("/api/v1/product")
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        console.log(response.body);
        expect(response.body).toEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
          data: expect.any(Array),
        });
      }));

  //Update Product
  it("Update product by id status code 200", async () => {
    request(app)
      .put(`/api/v1/product/2`)
      .set("Authorization", `Bearer ${bearerToken}`)
      .field({
        name: "sepatu test",
        price: "200000",
        categoryId: "convers",
        description: "Hitam",
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
          data: expect.any(Array),
        });
      });
  });

  afterAll(async () => {
    await Product.destroy({ where: { name: "sepatu test" } });
  });
});
