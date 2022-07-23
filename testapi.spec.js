const request = require("supertest");
const app = require("./server");

// Buyer Account
const roleBuyer = "buyer";
const nameBuyer = "Buyer Testing2";
const emailBuyer = "buyer_testing2@binar.com";
const passwordBuyer = "password";

// Seller Account
const roleSeller = "seller";
const nameSeller = "Seller Testing2";
const emailSeller = "seller_testing2@binar.com";
const passwordSeller = "password";

const emailNotRegister = "testNotResgister@binar.comm";
const passwordNotRegister = "randomPassword";

let bearerToken = "";

describe("POST /register", () => {
  // test register success
  it("should return 201 Created", async () => {
    const response = await request(app).post("/api/v1/register").send({
      role: roleBuyer,
      name: nameBuyer,
      email: emailBuyer,
      password: passwordBuyer,
      status: "active",
      registeredVia: "auth-form",
      emailVerifiedAt: new Date(),
      createAt: new Date(),
      updateAt: new Date(),
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      status: true,
      message: "User has been created!",
      data: expect.any(Object),
    });
  });

  // register seller test
  it("should return 201 Created", async () => {
    const response = await request(app).post("/api/v1/register").send({
      role: roleSeller,
      name: nameSeller,
      email: emailSeller,
      password: passwordSeller,
      status: "active",
      registeredVia: "auth-form",
      emailVerifiedAt: new Date(),
      createAt: new Date(),
      updateAt: new Date(),
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      status: true,
      message: "User has been created!",
      data: expect.any(Object),
    });
  });
  // register vaidate email buyer test
  it("should return 400 Bad Request", async () => {
    const response = await request(app).post("/api/v1/register").send({
      role: roleBuyer,
      name: nameBuyer,
      email: emailBuyer,
      password: passwordBuyer,
      status: "active",
      registeredVia: "auth-form",
      emailVerifiedAt: new Date(),
      createAt: new Date(),
      updateAt: new Date(),
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Email is already registered!",
    });
  });
  // register vaidate email seller test
  it("should return 400 Bad Request", async () => {
    const response = await request(app).post("/api/v1/register").send({
      role: roleSeller,
      name: nameSeller,
      email: emailSeller,
      password: passwordSeller,
      status: "active",
      registeredVia: "auth-form",
      emailVerifiedAt: new Date(),
      createAt: new Date(),
      updateAt: new Date(),
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: false,
      message: "Email is already registered!",
    });
  });

  afterAll(async () => {
    const deleteBuyer = await request(app).delete("/api/v1/user").send({
      email: emailBuyer,
    });

    const deleteSeller = await request(app).delete("/api/v1/user").send({
      email: emailSeller,
    });

    return deleteBuyer && deleteSeller;
  });

  beforeEach(async () => {
    return await request(app).post("/api/v1/register").send({
      role: roleBuyer,
      name: nameBuyer,
      email: emailBuyer,
      password: passwordBuyer,
      status: "active",
      registeredVia: "auth-form",
      emailVerifiedAt: new Date(),
      createAt: new Date(),
      updateAt: new Date(),
    });
  });

  describe("POST /login", () => {
    // test login Buyer success
    it("should return 200 OK", async () => {
      const response = await request(app).post("/api/v1/login").send({
        email: emailBuyer,
        password: passwordBuyer,
      });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: true,
        message: "Login successfully!",
        accessToken: response.body.accessToken,
      });
    });

    // test login failed wrong email and password
    it("should return 400 Bad Request", async () => {
      const response = await request(app).post("/api/v1/login").send({
        email: emailNotRegister,
        password: passwordNotRegister,
      });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        status: false,
        message: "Email is not registered!",
      });
    });

    beforeAll(async () => {
      // await request(app).post("/api/v1/register").send({
      //   role: roleBuyer,
      //   name: nameBuyer,
      //   email: emailBuyer,
      //   password: passwordBuyer,
      //   status: "active",
      //   registeredVia: "auth-form",
      //   emailVerifiedAt: new Date(),
      //   createAt: new Date(),
      //   updateAt: new Date(),
      // });

      const token = await request(app).post("/api/v1/login").send({
        email: emailBuyer,
        password: passwordBuyer,
      });

      bearerToken = token.body.accessToken;

      return bearerToken;
    });

    // profile test
    describe("GET /profile", () => {
      // test get profile success
      it("should return 200 OK", async () => {
        const response = await request(app)
          .get("/api/v1/profile")
          .set("Authorization", `Bearer ${bearerToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          status: true,
          message: "Successfully find data user",
          data: expect.any(Object),
        });
      });

      // test get profile failed
      it("should return 401 Unauthorized", async () => {
        const response = await request(app).get("/api/v1/profile");
        expect(response.status).toBe(401);
        expect(response.body).toEqual({
          message: "Unauthorized",
        });
      });
    });

    // afterAll(async () => {
    //   return await request(app).delete("/api/v1/user").send({
    //     email: emailRegister,
    //   });
    // });

    // it("Get user profile unauthorized (GET => '/user/profile')", () => {
    //   return request(app)
    //     .get("/user/profile")
    //     .expect(401)
    //     .then((response) => {
    //       expect(response.body).toHaveProperty("message");
    //     });
    // });
    // it("Get user profile (authorize) (GET => '/user/profile')", () => {
    //   return request(app)
    //     .get("/user/profile")
    //     .set(
    //       "Authorization",
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoicmVuYWwiLCJlbWFpbCI6InJlbmFsQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6MTQ6MDEuMTAzWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6Mjc6MzIuMjkxWiIsImlhdCI6MTY1Njk0NTIxNn0.epzUiFfbNDTPw7c6jw6CBH00thAJjeO7lXVcBadjMIg"
    //     )
    //     .expect(200)
    //     .then((response) => {
    //       expect(response.body).toHaveProperty("data");
    //     });
    // });
    // it("Update User (authorize) (PUT => '/user/update')", () => {
    //   return request(app)
    //     .put("/user/update")
    //     .set(
    //       "Authorization",
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoicmVuYWwiLCJlbWFpbCI6InJlbmFsQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6MTQ6MDEuMTAzWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6Mjc6MzIuMjkxWiIsImlhdCI6MTY1Njk0NTIxNn0.epzUiFfbNDTPw7c6jw6CBH00thAJjeO7lXVcBadjMIg"
    //     )
    //     .send({
    //       username: "New Renal",
    //       city: "Jakarta",
    //       address: "Jl. Baru Nomor 13",
    //       nohp: "081231312",
    //       email: "newmail@gmail.com",
    //     })
    //     .expect("Content-Type", /json/)
    //     .expect(200)
    //     .then((response) => {
    //       expect(response.body).toHaveProperty("status");
    //     });
    // });
    // it("Test upload foto untuk user(PUT => '/user/update')", () => {
    //   return request(app)
    //     .put("/user/update")
    //     .set(
    //       "Authorization",
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoicmVuYWwiLCJlbWFpbCI6InJlbmFsQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6MTQ6MDEuMTAzWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6Mjc6MzIuMjkxWiIsImlhdCI6MTY1Njk0NTIxNn0.epzUiFfbNDTPw7c6jw6CBH00thAJjeO7lXVcBadjMIg"
    //     )
    //     .attach("image", "../backend/coverage/testimg.png")
    //     .expect("Content-Type", /json/)
    //     .expect(200)
    //     .then((response) => {
    //       expect(response.body).toHaveProperty("status");
    //     });
    // });
    // it("Test upload foto untuk user but with PDF file (PUT => '/user/update')", () => {
    //   return request(app)
    //     .put("/user/update")
    //     .set(
    //       "Authorization",
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoicmVuYWwiLCJlbWFpbCI6InJlbmFsQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6MTQ6MDEuMTAzWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6Mjc6MzIuMjkxWiIsImlhdCI6MTY1Njk0NTIxNn0.epzUiFfbNDTPw7c6jw6CBH00thAJjeO7lXVcBadjMIg"
    //     )
    //     .attach("image", "../backend/coverage/testformat.pdf")
    //     .expect("Content-Type", /json/)
    //     .expect(201)
    //     .then((response) => {
    //       expect(response.body).toHaveProperty("status");
    //     });
    // });
    // it("Update User Password (authorize) (PUT => '/user/update/password') (akun testpass)", () => {
    //   return request(app)
    //     .put("/user/update/password")
    //     .set(
    //       "Authorization",
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdHBhc3MiLCJlbWFpbCI6InRlc3RwYXNzQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6NDE6NDAuODMxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6NDE6NDAuODMxWiIsImlhdCI6MTY1Njk0NTcxMH0.qrUNNQiT4oAolAWUTrmyWzOs6yoI6414HtRFZ5CYppU"
    //     )
    //     .send({
    //       // TUKER TUKERAN AJA ANTARA OLD SAMA NEW PASS UNTUK TESTING
    //       oldPassword: "testpassnew",
    //       newPassword: "testpass",
    //     })
    //     .expect("Content-Type", /json/)
    //     .expect(200)
    //     .then((response) => {
    //       expect(response.body).toHaveProperty("status");
    //     });
    // });
    // it("Update User Password But Old Password Wrong (PUT => '/user/update/password') (akun testpass)", () => {
    //   return request(app)
    //     .put("/user/update/password")
    //     .set(
    //       "Authorization",
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdHBhc3MiLCJlbWFpbCI6InRlc3RwYXNzQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6NDE6NDAuODMxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6NDE6NDAuODMxWiIsImlhdCI6MTY1Njk0NTcxMH0.qrUNNQiT4oAolAWUTrmyWzOs6yoI6414HtRFZ5CYppU"
    //     )
    //     .send({
    //       // TUKER TUKERAN AJA ANTARA OLD SAMA NEW PASS UNTUK TESTING
    //       oldPassword: "testpassxd",
    //       newPassword: "testpass",
    //     })
    //     .expect("Content-Type", /json/)
    //     .expect(201)
    //     .then((response) => {
    //       expect(response.body).toHaveProperty("message");
    //     });
    // });
    // it("Delete current user (authorize) (DELETE => '/user/delete')", () => {
    //   return (
    //     request(app)
    //       // HARUS BUAT AKUN DUMMY TERLEBIH DAHULU SEBELUM START TEST
    //       // LALU MASUKIN BEARER BARU KESINI
    //       .delete("/user/delete")
    //       .set(
    //         "Authorization",
    //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsInVzZXJuYW1lIjoiZGVsZXRlYWt1biIsImVtYWlsIjoiZGVsZXRlYWt1bkBnbWFpbC5jb20iLCJjcmVhdGVkQXQiOiIyMDIyLTA3LTA0VDE0OjQ2OjA3LjU4OVoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA3LTA0VDE0OjQ2OjA3LjU4OVoiLCJpYXQiOjE2NTY5NDU5NzF9.u3-Er1GprE1rHx1eJWKKBepPXI3nRFv3freJ1LHcPtw"
    //       )
    //       .expect(204)
    //   );
    // });
  });

  // describe("Product", () => {
  //   it("Detail Product (GET => '/product/detail/:id')", () => {
  //     return request(app)
  //       .get("/product/detail/1")
  //       .expect("Content-Type", /json/)
  //       .expect(200)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("data");
  //       });
  //   });
  //   it("Detail Product but undefined input (GET => '/product/detail/:id')", () => {
  //     return request(app)
  //       .get("/product/detail/:id")
  //       .expect("Content-Type", /json/)
  //       .expect(422)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //         expect(response.body).toHaveProperty("message");
  //       });
  //   });
  //   it("List all published product (GET => '/product')", () => {
  //     return request(app)
  //       .get("/product")
  //       .query({
  //         page: 1,
  //         size: 1,
  //         category: "pakaian",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(200)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("data");
  //       });
  //   });
  //   it("List all published product but minus input (GET => '/product')", () => {
  //     return request(app)
  //       .get("/product")
  //       .query({
  //         page: 1,
  //         size: -2,
  //         category: "pakaian",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(422)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //         expect(response.body).toHaveProperty("message");
  //       });
  //   });
  //   it("List all published product but size undefined (GET => '/product')", () => {
  //     return request(app)
  //       .get("/product")
  //       .query({
  //         page: 1,
  //         category: "pakaian",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //       });
  //   });
  //   it("List all published product but page undefined (GET => '/product')", () => {
  //     return request(app)
  //       .get("/product")
  //       .query({
  //         size: 1,
  //         category: "pakaian",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //       });
  //   });
  //   it("List all user product by query (GET => '/product/list/user')", () => {
  //     return request(app)
  //       .get("/product/list/user")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzAyNDM3Nn0.yzAWFutN1qlOkULmgXhZ0-pQcaPahq__ouLoZsbfJbA"
  //       )
  //       .query({
  //         publish: true,
  //         sold: false,
  //         interested: false,
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(200)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("data");
  //       });
  //   });
  //   it("List all user product by query (GET => '/product/list/user')", () => {
  //     return request(app)
  //       .get("/product/list/user")
  //       .query({
  //         publish: true,
  //         sold: false,
  //         interested: false,
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(401)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("message");
  //       });
  //   });
  //   it("Create product batas max (POST => '/product/create')", () => {
  //     return request(app)
  //       .post("/product/create")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzIwMTI5M30.Am9QGSKyhI3Y1bY2vXkN550WAvHwcnuOvksL3OZrPBk"
  //       )
  //       .send({
  //         name: "baju jamet",
  //         price: "25.000",
  //         category: "pakaian",
  //         deskripsi: "samting good",
  //       })
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body).toEqual({
  //           status: expect.any(String),
  //         });
  //       });
  //   });
  //   it("Update General Info Product (GET => '/product/update/1') Expect Unauthorized", () => {
  //     return request(app)
  //       .put("/product/update/1")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdHBhc3MiLCJlbWFpbCI6InRlc3RwYXNzQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6NDE6NDAuODMxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6NDE6NDAuODMxWiIsImlhdCI6MTY1Njk0NTcxMH0.qrUNNQiT4oAolAWUTrmyWzOs6yoI6414HtRFZ5CYppU"
  //       )
  //       .send({
  //         name: "New Kaos",
  //         price: "20.000",
  //         category: "pakaian",
  //         deskripsi: "Updated by Jest",
  //         image: "",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //       });
  //   });
  //   it("Update Photo Product with PDF (GET => '/product/update/1')", () => {
  //     return request(app)
  //       .put("/product/update/1")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdHBhc3MiLCJlbWFpbCI6InRlc3RwYXNzQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6NDE6NDAuODMxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6NDE6NDAuODMxWiIsImlhdCI6MTY1Njk0NTcxMH0.qrUNNQiT4oAolAWUTrmyWzOs6yoI6414HtRFZ5CYppU"
  //       )
  //       .attach("image", "../backend/coverage/testformat.pdf")
  //       .expect("Content-Type", /json/)
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //       });
  //   });
  //   it("Update Photo Product (GET => '/product/update/1')", () => {
  //     return request(app)
  //       .put("/product/update/1")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsInVzZXJuYW1lIjoidGVzdHBhc3MiLCJlbWFpbCI6InRlc3RwYXNzQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6NDE6NDAuODMxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTQ6NDE6NDAuODMxWiIsImlhdCI6MTY1Njk0NTcxMH0.qrUNNQiT4oAolAWUTrmyWzOs6yoI6414HtRFZ5CYppU"
  //       )
  //       .attach("image", "../backend/coverage/testimg.png")
  //       .expect("Content-Type", /json/)
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //       });
  //   });
  //   it("Update product attribute by query (PUT => '/product/attributes/update')", () => {
  //     return request(app)
  //       .put("/product/attributes/update")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzAyNDM3Nn0.yzAWFutN1qlOkULmgXhZ0-pQcaPahq__ouLoZsbfJbA"
  //       )
  //       .query({
  //         id: 2,
  //         publish: true,
  //         sold: false,
  //         interested: false,
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(200)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //       });
  //   });
  //   it("Update product attribute query but not the product owner (PUT => '/product/attributes/update')", () => {
  //     return request(app)
  //       .put("/product/attributes/update")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInVzZXJuYW1lIjoiZmF0d2EyIiwiZW1haWwiOiJmYXR3YTJAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMi0wNy0wN1QxMzozNjo0OC41NTlaIiwidXBkYXRlZEF0IjoiMjAyMi0wNy0wN1QxMzozNjo0OC41NTlaIiwiaWF0IjoxNjU3MjAyNDkwfQ.UuW0nVHA3ETbobrXv8DcKoFhd7TeMcKqdNAitnJS9Ks"
  //       )
  //       .query({
  //         id: 1,
  //         publish: true,
  //         sold: false,
  //         interested: false,
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //       });
  //   });
  //   it("Delete product but not the owner (DELETE => '/product/delete/:id')", () => {
  //     return (
  //       request(app)
  //         // HARUS BUAT PRODUCT DUMMY TERLEBIH DAHULU SEBELUM START TEST
  //         // LALU MASUKIN ID PRODUCT BARU KESINI
  //         .delete("/product/delete/1")
  //         .set(
  //           "Authorization",
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInVzZXJuYW1lIjoiZmF0d2EyIiwiZW1haWwiOiJmYXR3YTJAZ21haWwuY29tIiwiY3JlYXRlZEF0IjoiMjAyMi0wNy0wN1QxMzozNjo0OC41NTlaIiwidXBkYXRlZEF0IjoiMjAyMi0wNy0wN1QxMzozNjo0OC41NTlaIiwiaWF0IjoxNjU3MjAyNDkwfQ.UuW0nVHA3ETbobrXv8DcKoFhd7TeMcKqdNAitnJS9Ks"
  //         )
  //         .expect(201)
  //         .then((response) => {
  //           expect(response.body).toHaveProperty("status");
  //         })
  //     );
  //   });
  //   it("Delete current product (DELETE => '/product/delete/:id')", () => {
  //     return (
  //       request(app)
  //         // HARUS BUAT PRODUCT DUMMY TERLEBIH DAHULU SEBELUM START TEST
  //         // LALU MASUKIN ID PRODUCT BARU KESINI
  //         .delete("/product/delete/4")
  //         .set(
  //           "Authorization",
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzAyNDM3Nn0.yzAWFutN1qlOkULmgXhZ0-pQcaPahq__ouLoZsbfJbA"
  //         )
  //         .expect(204)
  //     );
  //   });
  //   it("Delete image product by id (DELETE => '/image/delete/:id')", () => {
  //     return (
  //       request(app)
  //         // HARUS BUAT IMAGE DUMMY TERLEBIH DAHULU SEBELUM START TEST
  //         // LALU MASUKIN ID IMAGE BARU KESINI
  //         .delete("/image/delete/6")
  //         .set(
  //           "Authorization",
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzAyNDM3Nn0.yzAWFutN1qlOkULmgXhZ0-pQcaPahq__ouLoZsbfJbA"
  //         )
  //         .expect(204)
  //     );
  //   });
  // });

  // describe("Transaction", () => {
  //   it("List transaction as buyer but not login (GET => '/transactions/list')", () => {
  //     return request(app)
  //       .get("/transactions/list")
  //       .query({
  //         page: 1,
  //         size: 1,
  //         by: "buyer",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(401)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("message");
  //       });
  //   });
  //   it("List transaction as buyer but page and size undefined (GET => '/transactions/list')", () => {
  //     return request(app)
  //       .get("/transactions/list")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzEwOTcwMX0.rXoshF-vDGJplPK7FuRmrKxutQy03CEdlh1zflYzbs8"
  //       )
  //       .query({
  //         by: "buyer",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(400)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //       })
  //       .catch((err) => {
  //         res.status(400).json({
  //           status: "FAIL",
  //           message: err.message,
  //         });
  //       });
  //   });
  //   it("List transaction as buyer (GET => '/transactions/list')", () => {
  //     return request(app)
  //       .get("/transactions/list")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzEwOTcwMX0.rXoshF-vDGJplPK7FuRmrKxutQy03CEdlh1zflYzbs8"
  //       )
  //       .query({
  //         page: 1,
  //         size: 1,
  //         by: "buyer",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(200)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //         expect(response.body).toHaveProperty("data");
  //       });
  //   });
  //   it("List transaction as seller (GET => '/transactions/list')", () => {
  //     return request(app)
  //       .get("/transactions/list")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzEwOTcwMX0.rXoshF-vDGJplPK7FuRmrKxutQy03CEdlh1zflYzbs8"
  //       )
  //       .query({
  //         page: 1,
  //         size: 5,
  //         by: "seller",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(200)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //         expect(response.body).toHaveProperty("data");
  //       });
  //   });
  //   it("List transaction by id (GET => '/transactions/detail/:id')", () => {
  //     return request(app)
  //       .get("/transactions/detail/1")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzEwOTcwMX0.rXoshF-vDGJplPK7FuRmrKxutQy03CEdlh1zflYzbs8"
  //       )
  //       .expect("Content-Type", /json/)
  //       .expect(200)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //         expect(response.body).toHaveProperty("data");
  //       })
  //       .catch((err) => {
  //         res.status(400).json({
  //           status: "FAIL",
  //           message: err.message,
  //         });
  //       });
  //   });
  //   it("List transaction by id (GET => '/transactions/detail/:id')", () => {
  //     return request(app)
  //       .get("/transactions/detail/1")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzEwOTcwMX0.rXoshF-vDGJplPK7FuRmrKxutQy03CEdlh1zflYzbs8"
  //       )
  //       .expect("Content-Type", /json/)
  //       .expect(200)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //         expect(response.body).toHaveProperty("data");
  //       })
  //       .catch((err) => {
  //         res.status(400).json({
  //           status: "FAIL",
  //           message: err.message,
  //         });
  //       });
  //   });
  //   it("List transaction but not login (GET => '/transactions/detail/:id')", () => {
  //     return request(app)
  //       .get("/transactions/detail/1")
  //       .expect("Content-Type", /json/)
  //       .expect(401)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("message");
  //       });
  //   });
  //   it("Create transaction by id product (POST => '/transactions/create/{product}')", () => {
  //     return request(app)
  //       .post("/transactions/create/7")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzEwOTcwMX0.rXoshF-vDGJplPK7FuRmrKxutQy03CEdlh1zflYzbs8"
  //       )
  //       .send({
  //         price: "15.000.000",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //         expect(response.body).toHaveProperty("data");
  //       });
  //   });
  //   it("Create transaction by id but product not found (POST => '/transactions/create/{product}')", () => {
  //     return request(app)
  //       .post("/transactions/create/55")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzEwOTcwMX0.rXoshF-vDGJplPK7FuRmrKxutQy03CEdlh1zflYzbs8"
  //       )
  //       .send({
  //         price: "15.000.000",
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(422)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //         expect(response.body).toHaveProperty("message");
  //       });
  //   });
  //   it("Update transaction by id(PUT => '/transactions/update')", () => {
  //     return request(app)
  //       .put("/transactions/update")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzEwOTcwMX0.rXoshF-vDGJplPK7FuRmrKxutQy03CEdlh1zflYzbs8"
  //       )
  //       .query({
  //         accept: false,
  //         id: 4,
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //       });
  //   });
  //   it("Update transaction by id but not the transaction owner (PUT => '/transactions/update')", () => {
  //     return request(app)
  //       .put("/transactions/update")
  //       .set(
  //         "Authorization",
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzEwOTcwMX0.rXoshF-vDGJplPK7FuRmrKxutQy03CEdlh1zflYzbs8"
  //       )
  //       .query({
  //         accept: false,
  //         id: 55,
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(201)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("status");
  //       });
  //   });
  //   it("Update transaction by id but not login (PUT => '/transactions/update')", () => {
  //     return request(app)
  //       .put("/transactions/update")
  //       .query({
  //         accept: false,
  //         id: 55,
  //       })
  //       .expect("Content-Type", /json/)
  //       .expect(401)
  //       .then((response) => {
  //         expect(response.body).toHaveProperty("message");
  //       });
  //   });
  //   it("Delete transaction by id (DELETE => '/transactions/delete/6')", () => {
  //     return (
  //       request(app)
  //         // HARUS BUAT IMAGE DUMMY TERLEBIH DAHULU SEBELUM START TEST
  //         // LALU MASUKIN ID IMAGE BARU KESINI
  //         .delete("/transactions/delete/6")
  //         .set(
  //           "Authorization",
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzAyNDM3Nn0.yzAWFutN1qlOkULmgXhZ0-pQcaPahq__ouLoZsbfJbA"
  //         )
  //         .expect(204)
  //     );
  //   });
  //   it("Delete transaction by id but not inputed (DELETE => '/transactions/delete/:id')", () => {
  //     return (
  //       request(app)
  //         // HARUS BUAT IMAGE DUMMY TERLEBIH DAHULU SEBELUM START TEST
  //         // LALU MASUKIN ID IMAGE BARU KESINI
  //         .delete("/transactions/delete/:id")
  //         .set(
  //           "Authorization",
  //           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImZhdHdhQGdtYWlsLmNvbSIsImNyZWF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsInVwZGF0ZWRBdCI6IjIwMjItMDctMDRUMTM6MTA6NDIuMTgxWiIsImlhdCI6MTY1NzAyNDM3Nn0.yzAWFutN1qlOkULmgXhZ0-pQcaPahq__ouLoZsbfJbA"
  //         )
  //         .expect(422)
  //         .then((response) => {
  //           expect(response.body).toHaveProperty("status");
  //           expect(response.body).toHaveProperty("message");
  //         })
  //     );
  //   });
});
