const request = require("supertest");
const app = require("../../server");

describe("GET /", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: true,
      message:
        "Shoesnarian API is up and running - FSW5 Kelompok-1 Final Project!",
    });
  });

  it("should return 404 Not Found", async () => {
    const response = await request(app).get("/not-found");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      ...response.body,
    });
  });
});

// test get product
describe("GET /products", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/api/v1/product");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: true,
      message: "Show all data product successfully!",
      data: expect.any(Array),
    });
  });
});
