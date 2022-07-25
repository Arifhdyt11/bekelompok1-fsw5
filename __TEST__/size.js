const request = require("supertest");
const { login } = require("../app/controllers/api/v1/auth/userController");
const app = require("../server");
const jwt_decode = require("jwt-decode");
const { response } = require("../server");

let bearerToken;

describe("/api/v1/size", () => {
  beforeAll(async () => {
    //buyer
    loginUser = await request(app).post("/api/v1/login").send({
      email: "seller1@binar.com",
      password: "password",
    });
    bearerToken = loginUser.body.accessToken;
    console.log(bearerToken);
    decoded = jwt_decode(bearerToken);
    console.log(decoded);
  });

  describe("CREATE /api/v1/size", () => {
    it("should return 201 status code and create data ", async () => {
      const res = await request(app)
        .post("/api/v1/size")
        .set("Authorization", `Bearer ${bearerToken}`)
        .send({
          productId: "1",
          sizeId: "3",
          stock: "3",
        });
      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Size has been created!");
      expect(res.body.data).toBeDefined();
    });
  });
});

describe("/api/v1/size/", () => {
  //Get ALL Size
  it("Get Size with status code 200", async () =>
    request(app)
      .get("/api/v1/size")
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        // console.log(response.body);
        expect(response.body).toEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
          data: expect.any(Array),
        });
      }));
});
