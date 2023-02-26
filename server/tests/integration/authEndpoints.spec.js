describe("Auth endpoints", () => {
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
    });

    beforeEach(async () => {
        console.log("-----------------------------------");
        await resetTestDB();
    });

    afterAll(async () => {
        console.log("Stopping test server");
        await api.close((err) => {});
    });

    describe("auth", () => {
        describe("POST /register", () => {
            test("it adds a user to the db", async () => {
                const res = await request(api)
                    .post("/auth/register")
                    .send(
                        JSON.stringify({
                            name: "tester",
                            email: "tester@email.com",
                            age: 23,
                            council: "council 4",
                            admin: false,
                            password: "password",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(201);
                expect(res.body.id).toBe(9);
                const newRes = await request(api)
                    .get("/users/user_name/tester")
                    .set("authorization", "Bearer" + token);
                expect(newRes.body).toBeTruthy();
            });

            test("it throws 500 error if email already has account", async () => {
                const res = await request(api)
                    .post("/auth/register")
                    .send(
                        JSON.stringify({
                            name: "tester",
                            email: "testuser1@email.com",
                            age: 23,
                            council: "council 4",
                            admin: false,
                            password: "password",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(500);
            });
        });

        describe("POST /login", () => {
            test("it retrieves object containing success=true and Bearer token", async () => {
                const res = await request(api)
                    .post("/auth/login")
                    .send(
                        JSON.stringify({
                            email: "testuser1@email.com",
                            password: "password1",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body.success).toBe(true);
                expect(res.body.Bearer).toBeTruthy();
            });

            test("it throws 400 error if no email provided", async () => {
                const res = await request(api)
                    .post("/auth/register")
                    .send(
                        JSON.stringify({
                            password: "password",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(400);
            });

            test("it throws 400 error if password is not provided", async () => {
                const res = await request(api)
                    .post("/auth/register")
                    .send(
                        JSON.stringify({
                            username: "tester",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(400);
            });

            test("it throws 500 error if cannot find user", async () => {
                const res = await request(api)
                    .post("/auth/register")
                    .send(
                        JSON.stringify({
                            username: "tester",
                            password: "password",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(500);
            });

            test("it throws 401 error if password is incorrect", async () => {
                const res = await request(api)
                    .post("/auth/register")
                    .send(
                        JSON.stringify({
                            username: "testuser1@email.com",
                            password: "incorrectpassword",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(401);
            });
        });

        describe("PATCH /password/:user_id", () => {
            test("it updates users password in the db", async () => {
                const res1 = await request(api)
                    .get("/auth/login")
                    .send(
                        JSON.stringify({
                            email: "testuser1@email.com",
                            password: "password1",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res1.statusCode).toEqual(200);
                const res2 = await request(api)
                    .post("/auth/password/1")
                    .send(
                        JSON.stringify({
                            old_password: "password1",
                            new_password: "newpassword",
                            confirm_password: "newpassword",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res2.statusCode).toEqual(200);
                const res3 = await request(api)
                    .get("/auth/login")
                    .send(
                        JSON.stringify({
                            email: "testuser1@email.com",
                            password: "password1",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res3.statusCode).toEqual(401);
                const res4 = await request(api)
                    .get("/auth/login")
                    .send(
                        JSON.stringify({
                            email: "testuser1@email.com",
                            password: "newpassword",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res4.statusCode).toEqual(200);
            });

            test("it throws 400 error if password confirmation is invalid", async () => {
                const res = await request(api)
                    .post("/auth/password/1")
                    .send(
                        JSON.stringify({
                            old_password: "password1",
                            new_password: "newpassword",
                            confirm_password: "wrongnewpassword",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(400);
            });

            test("it throws 401 error if old password is incorrect", async () => {
                const res = await request(api)
                    .post("/auth/password/1")
                    .send(
                        JSON.stringify({
                            old_password: "wrongoldpassword",
                            new_password: "newpassword",
                            confirm_password: "newpassword",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(401);
            });
        });
    });
});
