const request = require("supertest");
const app = require("../server");
const { Category } = require("../app/models");

describe("GET /api/v1/category", () => {
  it("should return 200 status code and get all data category", async () => {
    const res = await request(app).get("/api/v1/category");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Show all data category successfully!");
    expect(res.body.data).toBeDefined();
  });
});

describe("GET /api/v1/category/:id", () => {
  it("should return 200 status code and get data category by id", async () => {
    const res = await request(app).get("/api/v1/category/10");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Successfully find data");
    expect(res.body.data).toBeDefined();
  });

  it("should return 404 status code and data not found", async () => {
    const res = await request(app).get("/api/v1/category/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Data not found");
  });
});

describe("CREATE /api/v1/category", () => {
  it("should return 201 status code and create data category", async () => {
    const res = await request(app).post("/api/v1/category").send({
      name: "for",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Category has been created!");
    expect(res.body.data).toBeDefined();
  });

  afterAll(async () => {
    await Category.destroy({ where: { name: "for" } });
  });

  it("should return 400 status code and message name are required!", async () => {
    const res = await request(app).post("/api/v1/category").send({
      name: "",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Name are required!");
  });
});

describe("UPDATE /api/v1/category/:id", () => {
  // beforeEach(async () => {
  //   await Category.create({
  //     name: "formaz",
  //   });
  // });

  it("should return 200 status code and update data category", async () => {
    const res = await request(app).put("/api/v1/category/37").send({
      name: "Ruzss",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Category has been updated!");
    expect(res.body.data).toBeDefined();
  });

  it("should return 404 status code and data not found", async () => {
    const res = await request(app).put("/api/v1/category/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Data not found");
  });
});

describe("DELETE /api/v1/category/:id", () => {
  it("should return 200 status code and delete data category", async () => {
    const res = await request(app).delete("/api/v1/category/8");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.message).toBe("Category has been deleted!");
  });

  it("should return 404 status code and data not found", async () => {
    const res = await request(app).delete("/api/v1/category/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe(false);
    expect(res.body.message).toBe("Data not found");
  });
});
