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

    describe("auth", () => {
        describe("POST /login", () => {
            test("it retrieves object containing success=true and a token", async () => {
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
        });

        describe("POST /register", () => {
            test("it adds a user to the db", async () => {
                const res = await request(api)
                    .post("/auth/register")
                    .send(
                        JSON.stringify({
                            username: "tester",
                            password: "tester",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(201);
                expect(res.body.id).toBe(9);
                const newRes = await request(api)
                    .get("/users/9")
                    .set("authorization", token);
                expect(newRes.body).toBeTruthy();
            });

            test("it throws 500 error if no email provided", async () => {
                const res = await request(api)
                    .post("/auth/register")
                    .send(
                        JSON.stringify({
                            password: "tester",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(500);
            });

            test("it throws 500 error if password is not provided", async () => {
                const res = await request(api)
                    .post("/auth/register")
                    .send(
                        JSON.stringify({
                            username: "tester",
                        })
                    )
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(500);
            });
        });
    });
});
