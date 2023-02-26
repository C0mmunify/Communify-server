describe("User endpoints", () => {
    let api;
    let adminToken;
    let nonAdminToken;

    beforeAll(async () => {
        api = app.listen(port, () =>
            console.log("Test server running on port 5000...")
        );
        await resetTestDB();
        const adminResponse = await request(api)
            .post("/auth/login")
            .send({ email: "testuser1@email.com", password: "password1" })
            .set("Accept", "application/json");
        adminToken = "Bearer" + adminResponse._body.Bearer;
        const nonAdminResponse = await request(api)
            .post("/auth/login")
            .send({ email: "testuser3@email.com", password: "password3" })
            .set("Accept", "application/json");
        nonAdminToken = "Bearer" + nonAdminResponse._body.Bearer;
    });

    beforeEach(async () => {
        console.log("-----------------------------------");
        await resetTestDB();
    });

    afterAll(async () => {
        console.log("Stopping test server");
        await api.close((err) => {});
    });

    describe("/users", () => {
        describe("authenticated GET /", () => {
            test("it should return all users", async () => {
                const res = await request(api)
                    .get("/users")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveLength(8);
            });

            test("it should return 403 if consumer is non-admin", async () => {
                const res = await request(api)
                    .get("/users")
                    .set("authorization", nonAdminToken)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("unauthenticated GET /", () => {
            test("it should return 403 in case of invalid token", async () => {
                const res = await request(api)
                    .get("/users")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated GET /:user_id", () => {
            test("it should retrieve user based on ID", async () => {
                const res = await request(api)
                    .get("/users/2")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual("testuser2@email.com");
            });
        });

        describe("unauthenticated GET /:user_id", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .get("/users/2")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated GET /user_name/:user_name", () => {
            test("it should retrieve user based on user's name", async () => {
                const res = await request(api)
                    .get("/users/user_name/Test%20User%203")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual("testuser3@email.com");
            });
        });

        describe("unauthenticated GET /user_name/:user_name", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .get("/users/3")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated GET /user_name/:user_name", () => {
            test("it should retrieve users created events based on users ID", async () => {
                const res = await request(api)
                    .get("/users/1/events/created")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body.events).toHaveLength(2);
                expect(res.body.events[0].title).toMatch(/Example Event 1/i);
            });
        });

        describe("unauthenticated GET /user_name/:user_name", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .get("/users/1/events/created")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated GET /user_name/:user_name", () => {
            test("it should retrieve users attended events based on users name", async () => {
                const res = await request(api)
                    .get("/users/user_name/Test%20User%204/events/attending")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body.events).toHaveLength(2);
            });
        });

        describe("unauthenticated GET /user_name/:user_name", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .get("/users/user_name/Test%20User%204/events/attending")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated PATCH /:user_id", () => {
            test("it should update user data", async () => {
                const res = await request(api)
                    .patch("/users/7")
                    .send(
                        JSON.stringify({
                            name: "Test User 7",
                            email: "newemail@email.com",
                            phone: "7890123456",
                            age: 14,
                            council: "council 3",
                            profile_image: "image 7",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body.id).toBe(7);
                expect(res.body.email).toBe("newemail@email.com");
            });
        });

        describe("unauthenticated PATCH /:user_id", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .patch("/users/7")
                    .send(
                        JSON.stringify({
                            name: "Test User 7",
                            email: "newemail@email.com",
                            phone: "7890123456",
                            age: 14,
                            council: "council 3",
                            profile_image: "image 7",
                        })
                    )
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated DELETE /:user_id", () => {
            test("it should update user data", async () => {
                const res1 = await request(api)
                    .get("/users")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res1.statusCode).toEqual(200);
                expect(res1.body).toHaveLength(8);
                const res2 = await request(api)
                    .delete("/users/7")
                    .set("Content-Type", "application/json");
                expect(res2.statusCode).toEqual(200);
                const res3 = await request(api)
                    .get("/users")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res3.statusCode).toEqual(200);
                expect(res3.body).toHaveLength(7);
            });
        });

        describe("unauthenticated DELETE /:user_id", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .delete("/users/7")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });
    });
});
