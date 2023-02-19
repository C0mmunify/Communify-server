describe("successful endpoints", () => {
    let api;
    let token;

    beforeAll(async () => {
        api = app.listen(port, () =>
            console.log("Test server running on port 5000...")
        );
        await resetTestDB();
        const loginResponse = await request(api)
            .post("/auth/login")
            .send({ email: "testuser1@email.com", password: "password1" })
            .set("Accept", "application/json");
        token = loginResponse._body.Bearer;
    }, 100000);

    beforeEach(async () => {
        console.log("-----------------------------------");
        await resetTestDB();
    });

    afterAll(async () => {
        console.log("Stopping test server");
        await api.close((err) => {});
    });

    describe("user", () => {
        describe("authenticated GET /", () => {
            test("it should return all users", async () => {
                console.log(token);
                const res = await request(api)
                    .get("/user")
                    .set("authorization", token)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveLength(8);
            });
        });

        describe("unauthenticated GET /", () => {
            test("it should return 403 in case of invalid token", async () => {
                const res = await request(api)
                    .get("/user")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated GET /:user_id", () => {
            test("it should retrieve user based on ID", async () => {
                const res = await request(api)
                    .get("/user/2")
                    .set("authorization", token)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual("testuser2@email.com");
            });
        });

        describe("unauthenticated GET /:user_id", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .get("/user/2")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated GET /user_name/:user_name", () => {
            test("it should retrieve user based on user's name", async () => {
                const res = await request(api)
                    .get("/user/user_name/Test%20User%203")
                    .set("authorization", token)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual("testuser3@email.com");
            });
        });

        describe("unauthenticated GET /user_name/:user_name", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .get("/user/3")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated PATCH /:user_id", () => {
            test("it should update user data", async () => {
                const res = await request(api)
                    .patch("/user/7")
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
                    .patch("/user/7")
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

        describe("authenticated PATCH /:user_id/password", () => {
            test("it should update user data", async () => {
                const res = await request(api)
                    .patch("/user/7/password")
                    .send(
                        JSON.stringify({
                            password: "newpassword",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body.id).toBe(7);
                expect(res.body.email).toBe("newemail@email.com");
            });
        });

        describe("unauthenticated PATCH /:user_id/password", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .patch("/user/7/password")
                    .send(
                        JSON.stringify({
                            password: "newpassword",
                        })
                    )
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated DELETE /:user_id", () => {
            test("it should update user data", async () => {
                const res1 = await request(api)
                    .get("/user")
                    .set("authorization", token)
                    .set("Accept", "application/json");
                expect(res1.statusCode).toEqual(200);
                expect(res1.body).toHaveLength(8);
                const res2 = await request(api)
                    .patch("/user/7")
                    .set("Content-Type", "application/json");
                expect(res2.statusCode).toEqual(200);
                const res3 = await request(api)
                    .get("/user")
                    .set("authorization", token)
                    .set("Accept", "application/json");
                expect(res3.statusCode).toEqual(200);
                expect(res3.body).toHaveLength(7);
            });
        });

        describe("unauthenticated DELETE /:user_id", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .patch("/user/7")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });
    });
});
