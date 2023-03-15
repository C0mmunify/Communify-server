require("dotenv").config();

const eventController = require("../../../controllers/eventControllers");
const Event = require("../../../models/eventModel");
const User = require("../../../models/userModel");
const utils = require("../../../utilities/authUtils");
const testEventData = require("../testEventSeeds.json");
const testUserData = require("../testUserSeeds.json");

const mockSend = jest.fn();
const mockJson = jest.fn((message) => ({}));
const mockStatus = jest.fn((statusCode) => ({
    send: mockSend,
    json: mockJson,
}));
const mockRes = { status: mockStatus };

describe("Event controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("findAllEvents", () => {
        test("it returns successful response with 200 status code", async () => {
            const testEvents = testEventData;
            jest.spyOn(Event, "findAllEvents").mockResolvedValueOnce(
                testEvents
            );
            const mockReq = {
                headers: {
                    authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.7DXwNbHtZoPUCoGv_Odt-jIOY2bBJDhBJeZKwpWCvCM",
                },
            };
            await eventController.findAllEvents(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 403 if user is not admin", async () => {
            const mockReq = {
                headers: {
                    authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1MTYyMzkwMjJ9.BHogMyBoAFODgNGWUtiR9tl6wLO0Ib90g4dgZrOWhLEn",
                },
            };
            await eventController.findAllEvents(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(403);
        });

        test("it responds with code 500 in case of error", async () => {
            jest.spyOn(Event, "createEvent").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                headers: { authorization: "testtoken" },
            };
            await eventController.findAllEvents(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        });
    });

    describe("findById", () => {
        test("it returns successful response with 200 status code", async () => {
            const testEvent = testEventData[0];
            jest.spyOn(Event, "findById").mockResolvedValueOnce(testEvent);
            const mockReq = {
                params: {
                    event_id: "test ID",
                },
            };
            await eventController.findById(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 404 in case of error", async () => {
            jest.spyOn(Event, "findById").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                params: {
                    event_id: "test ID",
                },
            };
            await eventController.findById(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
        });
    });

    describe("findByIdWithAttendees", () => {
        test("it returns successful response with 200 status code", async () => {
            const testEvent = testEventData[0];
            jest.spyOn(Event, "findById").mockResolvedValueOnce(
                new Event(testEvent)
            );
            jest.spyOn(Event.prototype, "getAttendees").mockResolvedValueOnce(
                testUserData
            );
            const mockReq = {
                params: {
                    event_id: 1,
                },
            };
            await eventController.findByIdWithAttendees(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 404 in case of error", async () => {
            jest.spyOn(Event, "findById").mockImplementation(() => {
                throw new Error();
            });
            jest.spyOn(Event.prototype, "getAttendees").mockResolvedValueOnce(
                testUserData
            );
            const mockReq = {
                params: {
                    event_id: 1,
                },
            };
            await eventController.findByIdWithAttendees(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
        });
    });

    describe("findByTitle", () => {
        test("it returns successful response with 200 status code", async () => {
            const testEvent = testEventData[0];
            jest.spyOn(Event, "findByTitle").mockResolvedValueOnce(testEvent);
            const mockReq = {
                params: {
                    event_title: "test name",
                },
            };
            await eventController.findByTitle(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 404 in case of error", async () => {
            jest.spyOn(Event, "findByTitle").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                params: {
                    event_title: "test name",
                },
            };
            await eventController.findByTitle(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
        });
    });

    // describe("findByArea", () => {
    //     test("it returns successful response with 200 status code", async () => {
    //         const testEvent = testEventData[0];
    //         jest.spyOn(Event, "findByArea").mockResolvedValueOnce(testEvent);
    //         const mockReq = {
    //             params: {
    //                 area: "test area",
    //             },
    //             headers: {
    //                 authorization:
    //                     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYXJlYSI6InRlc3QgYXJlYSIsImlhdCI6MTUxNjIzOTAyMn0.7JTmGXuxU_Oieb_W0VKAlszXBCJaWww_SAXPnbJ54-o",
    //             },
    //         };
    //         await eventController.findByArea(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(200);
    //     });

    //     test("it responds with code 404 in case of error", async () => {
    //         jest.spyOn(Event, "findByArea").mockImplementation(() => {
    //             throw new Error();
    //         });
    //         const mockReq = {
    //             params: {
    //                 area: "test area",
    //             },
    //             headers: {
    //                 authorization:
    //                     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibm8gYXJlYSI6InRlc3QgYXJlYSIsImlhdCI6MTUxNjIzOTAyMn0.k_jD33AVEncJJEAPJ6LZNNzW005t1i8oXSqLWmARN1s",
    //             },
    //         };
    //         await eventController.findByArea(mockReq, mockRes);
    //         expect(mockStatus).toHaveBeenCalledWith(404);
    //     });
    // });

    describe("createEvent", () => {
        test("it returns successful response with 201 status code", async () => {
            const testEvent = testEventData[0];
            jest.spyOn(Event, "createEvent").mockResolvedValueOnce(testEvent);
            jest.spyOn(utils, "DecodeJwtToken").mockResolvedValueOnce(1);
            const mockReq = {
                body: testEvent,
                headers: {
                    authorization: "token",
                },
            };
            await eventController.createEvent(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
        });

        test("it responds with code 400 in case of error", async () => {
            const testEvent = testEventData[0];
            jest.spyOn(Event, "createEvent").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                body: testEvent,
            };
            await eventController.createEvent(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(400);
        });
    });

    describe("updateEvent", () => {
        test("it returns successful response with 200 status code", async () => {
            const testEvent = testEventData[0];
            jest.spyOn(Event, "updateEvent").mockResolvedValueOnce(testEvent);
            const mockReq = {
                params: {
                    event_id: "test ID",
                },
            };
            await eventController.updateEvent(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 500 in case of error", async () => {
            jest.spyOn(Event, "updateEvent").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                params: {
                    event_id: "test ID",
                },
            };
            await eventController.updateEvent(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        });
    });

    describe("deleteEvent", () => {
        test("it returns successful response with 200 status code", async () => {
            jest.spyOn(Event, "deleteEvent").mockResolvedValueOnce(
                "Event deleted"
            );
            const mockReq = {
                params: {
                    event_id: "test ID",
                },
            };
            await eventController.deleteEvent(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 500 in case of error", async () => {
            jest.spyOn(Event, "deleteEvent").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                params: {
                    event_id: "test ID",
                },
            };
            await eventController.deleteEvent(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        });
    });

    describe("addAttendee", () => {
        test("it returns successful response with 200 status code", async () => {
            const testEvent = testEventData[0];
            jest.spyOn(Event, "findById").mockResolvedValueOnce(
                new Event(testEvent)
            );
            jest.spyOn(
                Event.prototype,
                "checkAttendance"
            ).mockResolvedValueOnce(false);
            jest.spyOn(Event.prototype, "addAttendee").mockResolvedValueOnce(
                "Success"
            );
            const mockReq = {
                params: {
                    event_id: 1,
                },
                body: {
                    user_id: 1,
                },
            };
            await eventController.addAttendee(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 500 if user already attending", async () => {
            const testEvent = testEventData[0];
            jest.spyOn(Event, "findById").mockResolvedValueOnce(
                new Event(testEvent)
            );
            jest.spyOn(
                Event.prototype,
                "checkAttendance"
            ).mockResolvedValueOnce(true);
            const mockReq = {
                params: {
                    event_id: 1,
                },
                body: {
                    user_id: 1,
                },
            };
            await eventController.addAttendee(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        });
    });

    describe("removeAttendee", () => {
        test("it returns successful response with 200 status code", async () => {
            const testEvent = testEventData[0];
            jest.spyOn(Event, "findById").mockResolvedValueOnce(
                new Event(testEvent)
            );
            jest.spyOn(Event.prototype, "deleteAttendee").mockResolvedValueOnce(
                "Success"
            );
            const mockReq = {
                params: {
                    event_id: 1,
                },
            };
            await eventController.removeAttendee(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 500 if user already attending", async () => {
            jest.spyOn(Event, "findById").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                params: {
                    event_id: 1,
                },
            };
            await eventController.removeAttendee(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        });
    });
});
