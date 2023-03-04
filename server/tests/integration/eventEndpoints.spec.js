describe("Event endpoints", () => {
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
        adminToken = "Bearer " + adminResponse._body.Bearer;
        const nonAdminResponse = await request(api)
            .post("/auth/login")
            .send({ email: "testuser3@email.com", password: "password3" })
            .set("Accept", "application/json");
        nonAdminToken = "Bearer " + nonAdminResponse._body.Bearer;
    }, 100000);

    beforeEach(async () => {
        await resetTestDB();
    });

    afterAll(async () => {
        console.log("Stopping test server");
        await api.close((err) => {});
    });

    describe("/events", () => {
        describe("authenticated GET /", () => {
            test("it should return all events", async () => {
                const res = await request(api)
                    .get("/events")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body).toHaveLength(4);
            });

            test("it should return 403 if consumer is non-admin", async () => {
                const res = await request(api)
                    .get("/events")
                    .set("authorization", nonAdminToken)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("unauthenticated GET /", () => {
            test("it should return 403 in case of invalid token", async () => {
                const res = await request(api)
                    .get("/events")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated GET /:event_id", () => {
            test("it should retrieve event based on ID", async () => {
                const res = await request(api)
                    .get("/events/2")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body.title).toEqual("Example Event 2");
            });
        });

        describe("unauthenticated GET /:event_id", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .get("/events/2")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated GET /:event_id/attendees", () => {
            test("it should retrieve event based on ID", async () => {
                const res = await request(api)
                    .get("/events/3/attendees")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body.attendees).toHaveLength(3);
            });
        });

        describe("unauthenticated GET /:event_id/attendees", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .get("/events/3/attendees")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated GET /event_title/:event_title", () => {
            test("it should retrieve event based on event's name", async () => {
                const res = await request(api)
                    .get("/events/event_title/Example%20Event%203")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
                expect(res.body.id).toEqual(3);
            });
        });

        describe("unauthenticated GET /event_title/:event_title", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .get("/events/event_title/Test%20Event%203")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated POST /", () => {
            test("it should retrieve events created events based on events ID", async () => {
                const res = await request(api)
                    .post("/events/")
                    .send(
                        JSON.stringify({
                            title: "Example event 5",
                            description: "This is an example event 5.",
                            location: "Address 5",
                            council: "Council 5",
                            creator_id: 1,
                            spaces_total: 3,
                            spaces_remaining: 3,
                            date_occurring: "2023-01-28T11:00:00.000Z",
                            date_ending: "2023-01-28T18:00:00.000Z",
                        })
                    )
                    .set("authorization", adminToken)
                    .set("Content-Type", "application/json");
                expect(res.statusCode).toEqual(201);
                expect(res.body.id).toEqual(5);
            });
        });

        describe("unauthenticated POST /", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .post("/events/")
                    .send(
                        JSON.stringify({
                            title: "Example event 5",
                            description: "This is an example event 5.",
                            location: "Address 5",
                            council: "Council 5",
                            creator_id: 1,
                            spaces_total: 3,
                            spaces_remaining: 3,
                            date_created: "2023-01-23T00:00:00.000Z",
                            date_occurring: "2023-01-28T11:00:00.000Z",
                            date_ending: "2023-01-28T18:00:00.000Z",
                        })
                    )
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated POST /:event_id/attendees", () => {
            test("it should retrieve events created events based on events ID", async () => {
                const res = await request(api)
                    .post("/events/3/attendees/")
                    .send(
                        JSON.stringify({
                            user_id: 1,
                        })
                    )
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res.statusCode).toEqual(200);
            });
        });

        describe("unauthenticated POST /:event_id/attendees", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .post("/events/3/attendees/")
                    .send(
                        JSON.stringify({
                            user_id: 1,
                        })
                    )
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated PATCH /:event_id", () => {
            test("it should update event data", async () => {
                const res = await request(api)
                    .patch("/events/4")
                    .send(
                        JSON.stringify({
                            location: "new address",
                        })
                    )
                    .set("Content-Type", "application/json")
                    .set("authorization", adminToken);
                expect(res.statusCode).toEqual(200);
                expect(res.body.id).toEqual(4);
                expect(res.body.location).toMatch(/new address/i);
            });
        });

        describe("unauthenticated PATCH /:event_id", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .patch("/events/7")
                    .send(
                        JSON.stringify({
                            location: "new address",
                        })
                    )
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated DELETE /:event_id", () => {
            test("it should delete event data", async () => {
                const res1 = await request(api)
                    .get("/events")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res1.statusCode).toEqual(200);
                expect(res1.body).toHaveLength(4);
                const res2 = await request(api)
                    .delete("/events/3")
                    .set("Content-Type", "application/json")
                    .set("authorization", adminToken);
                expect(res2.statusCode).toEqual(200);
                const res3 = await request(api)
                    .get("/events")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res3.statusCode).toEqual(200);
                expect(res3.body).toHaveLength(3);
            });
        });

        describe("unauthenticated DELETE /:event_id", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .delete("/events/3")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });

        describe("authenticated DELETE /:event_id/attendees/:user_id", () => {
            test("it should update event data", async () => {
                const res1 = await request(api)
                    .get("/events/3/attendees")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res1.statusCode).toEqual(200);
                expect(res1.body.attendees).toHaveLength(3);
                const res2 = await request(api)
                    .delete("/events/3/attendees/7")
                    .set("Content-Type", "application/json")
                    .set("authorization", adminToken);
                expect(res2.statusCode).toEqual(200);
                const res3 = await request(api)
                    .get("/events/3/attendees")
                    .set("authorization", adminToken)
                    .set("Accept", "application/json");
                expect(res3.statusCode).toEqual(200);
                expect(res3.body.attendees).toHaveLength(2);
            });
        });

        describe("unauthenticated DELETE /:event_id/attendees/:user_id", () => {
            test("it should return 403 if invalid token sent", async () => {
                const res = await request(api)
                    .delete("/events/3/attendees/7")
                    .set("authorization", "Bearer VERY.GOOD.REAL.TOKEN");
                expect(res.statusCode).toEqual(403);
            });
        });
    });
});
