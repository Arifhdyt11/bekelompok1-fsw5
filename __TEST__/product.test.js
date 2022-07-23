const request = require("supertest");
const app = require("../server");

// Seller Account
const roleSeller = "seller";
const nameSeller = "Seller Testing2";
const emailSeller = "seller_testing2@binar.com";
const passwordSeller = "password";
const citySeller = "jakarta";
const addressSeller = "jl.jakarta";
const phoneSeller = "0812345678";
const imageSeller = "image.png";

const emailNotRegister = "testNotResgister@binar.comm";
const passwordNotRegister = "randomPassword";

let bearerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJzZWxsZXJfdGVzdGluZzJAYmluYXIuY29tIiwicm9sZSI6IlNFTExFUiIsImlhdCI6MTY1ODU1ODMzMywiZXhwIjoxNjU4NTYxOTMzfQ.711U6efreu4kAsxYY-caWvTFd0ni_W6aXXWt1m6MJy0";

describe("POST /api/v1/product", () => {
  beforeAll(async () => {
    const token = await request(app).post("/api/v1/login").send({
      email: emailSeller,
      password: passwordSeller,
    });
    bearerToken = token.body.accessToken;

    return bearerToken;
  });

  it("should return 200 created ", async () => {
    return request(app)
      .post("/api/v1/product")
      .set("Content-Type", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        categoryId: "5",
        name: "boots",
        price: "25000",
        deskripsi: "so nice",
        image: "boots.png",
      })
      .expect(200)
      .then((response) => {
        expect(response.body.status).toBe(true);
        expect(response.body.message).toBe("product added");
        expect(response.body.data).toBeDefined();
      });
  });

  //product test
  // describe("POST /api/v1/product", () => {
  //   beforeAll(async () => {
  //     const token = await request(app).post("/api/v1/login").send({
  //       email: emailSeller,
  //       password: passwordSeller,
  //     });

  //     bearerToken = token.body.accessToken;

  //     return bearerToken;
  //   });
  //   // afterAll(async () => {
  //   //   await Product.destroy({ where: { product_name: 'Jam Test' } });

  //   // });

  //   it("Create product batas max (POST => 'api/v1/product')", () => {
  //     return request(app)
  //       .post("api/v1/product")
  //       .set("content-type", "application/json")
  //       .send({
  //         categoryId: "8",
  //         name: "boots",
  //         price: "25000",
  //         deskripsi: "so nice",
  //         image: "boots.png",
  //       })
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body.status).toBe(true);
  //         expect(response.body.message).toBe("product added");
  //         expect(respone.body.data).toBeDefined();
  //       });
  //   });
});
