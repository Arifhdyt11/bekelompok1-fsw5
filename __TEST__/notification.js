const request = require("supertest");
const app = require("../server");

//Get All Data

describe("GET /api/v1/notif CREATE||GET", () => {
  it("should return 200 status code and get all data Notification", async () => {
    const res = await request(app).get("/api/v1/notif");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Show all data notification successfully!");
    expect(res.body.data).toBeDefined();
  });
});

//buyer notification
describe("/api/v1/notif", () => {
  let bearerToken;
  let decoded;
  beforeAll(async () => {
    loginUser = await request(app).post("/api/v1/login").send({
      email: "buyer1@binar.com",
      password: "password",
    });
    bearerToken = loginUser.body.accessToken;
    console.log(bearerToken);
  });

  //Create Notification
  // it("Create notification should return 200 created ", async () => {
  //   return request(app)
  //     .post("/api/v1/product")
  //     .set("Content-Type", "application/json")
  //     .set("Authorization", `Bearer ${bearerToken}`)
  //     .send({
  //        transactionId: "4",
  //        isReadBuyer: false,
  //        isReadSeller: false,
  //        message: "ini pesan notif",
  //     })

  //     .then((res) => {
  //       expect(res.status).toBe(200);
  //       expect(res.body.status).toBe(true);
  //       expect(res.body.message).toBe("Product added");
  //       expect(res.body.data).toBeDefined();
  //     });

  //update isRead Buyer

  it("should return 200 status code and update data isRead Buyer", async () => {
    const res = await request(app).put("/api/v1/notif/buyer/3").send({
      isReadBuyer: true,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("isRead Buyer has been updated!");
    expect(res.body.data).toBeDefined();
  });

  it("should return 404 status code and data not found", async () => {
    const res = await request(app).put("/api/v1/notif/buyer/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Data not found");
  });

  //update ALL isRead Buyer

  it("should return 200 status code and update data isRead Buyer", async () => {
    const res = await request(app).put("/api/v1/notif/buyer").send({
      isReadBuyer: true,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("All isRead Buyer has been updated!");
    expect(res.body.data).toBeDefined();
  });
  it("should return 404 status code and data not found", async () => {
    const res = await request(app).put("/api/v1/notif/buyer123");
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Data not found");
  });

  //Get Notification by buyer
  it("Get notification with status code 200", async () =>
    request(app)
      .get("/api/v1/notif/buyer")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        expect(res.body).toEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
          data: expect.any(Array),
        });
      }));

  //Delete
  it("should return 200 status code and delete data category", async () => {
    const res = await request(app)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .delete("/api/v1/notif/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("notification has been deleted!");
  });

  it("should return 404 status code and data not found", async () => {
    const res = await request(app)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .delete("/api/v1/notif/999");

    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Data not found");
  });
});

//seller notification
describe("/api/v1/notif", () => {
  let bearerToken;
  let decoded;
  beforeAll(async () => {
    loginUser = await request(app).post("/api/v1/login").send({
      email: "seller1@binar.com",
      password: "password",
    });
    bearerToken = loginUser.body.accessToken;
    console.log(bearerToken);
  });

  //Get Notification by Seller
  it("Get notification with status code 200", async () =>
    request(app)
      .get("/api/v1/notif/seller")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        expect(res.body).toEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
          data: expect.any(Array),
        });
      }));

  //update isRead Seller

  it("should return 200 status code and update data isRead Buyer", async () => {
    const res = await request(app)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .put("/api/v1/notif/seller/4")
      .send({
        isReadSeller: true,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("isRead Seller has been updated!");
    expect(res.body.data).toBeDefined();
  });

  it("should return 404 status code and data not found", async () => {
    const res = await request(app)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .put("/api/v1/notif/seller/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Data not found");
  });

  //update ALL isRead seller

  it("should return 200 status code and update data isRead Seller", async () => {
    const res = await request(app)
      .put("/api/v1/notif/seller")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        isReadSeller: true,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("All isSeller Buyer has been updated!");
    expect(res.body.data).toBeDefined();
  });
  it("should return 404 status code and data not found", async () => {
    const res = await request(app)
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .put("/api/v1/notif/seller123");
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Data not found");
  });

  //Get Notification by seller
  it("Get notification with status code 200", async () =>
    request(app)
      .get("/api/v1/notif/buyer")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${bearerToken}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        console.log(res.body);
        expect(res.body).toEqual({
          status: expect.any(Boolean),
          message: expect.any(String),
          data: expect.any(Array),
        });
      }));
});
