require("dotenv").config();

const userController = require("../../../controllers/userControllers");
const User = require("../../../models/userModel");
const Event = require("../../../models/eventModel");
const testUserData = require("../testUserSeeds.json");
const testEventData = require("../testEventSeeds.json");
const filters = require("../../../utilities/controllerUtils");

const mockSend = jest.fn();
const mockJson = jest.fn((message) => ({}));
const mockStatus = jest.fn((statusCode) => ({
    send: mockSend,
    json: mockJson,
}));
const mockRes = { status: mockStatus };

describe("User controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("findAllUsers", () => {
        test("it returns successful response with 200 status code", async () => {
            const testUsers = testUserData;
            jest.spyOn(User, "findAllUsers").mockResolvedValueOnce(testUsers);
            const mockReq = {
                headers: {
                    authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.7DXwNbHtZoPUCoGv_Odt-jIOY2bBJDhBJeZKwpWCvCM",
                },
            };
            await userController.findAllUsers(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 403 if user is not admin", async () => {
            const mockReq = {
                headers: {
                    authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYWRtaW4iOmZhbHNlLCJpYXQiOjE1MTYyMzkwMjJ9.BHogMyBoAFODgNGWUtiR9tl6wLO0Ib90g4dgZrOWhLEn",
                },
            };
            await userController.findAllUsers(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(403);
        });

        test("it responds with code 500 in case of error", async () => {
            jest.spyOn(User, "createUser").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                headers: { authorization: "testtoken" },
            };
            await userController.findAllUsers(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        });
    });

    describe("findById", () => {
        test("it returns successful response with 200 status code", async () => {
            const testUser = testUserData[0];
            jest.spyOn(User, "findById").mockResolvedValueOnce(testUser);
            const mockReq = {
                params: {
                    user_id: "test ID",
                },
            };
            await userController.findById(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 404 in case of error", async () => {
            jest.spyOn(User, "findById").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                params: {
                    user_id: "test ID",
                },
            };
            await userController.findById(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
        });
    });

    describe("findByName", () => {
        test("it returns successful response with 200 status code", async () => {
            const testUser = testUserData[0];
            jest.spyOn(User, "findByName").mockResolvedValueOnce(testUser);
            const mockReq = {
                params: {
                    user_name: "test name",
                },
            };
            await userController.findByName(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 404 in case of error", async () => {
            jest.spyOn(User, "findByName").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                params: {
                    user_name: "test name",
                },
            };
            await userController.findByName(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
        });
    });

    describe("findEventsByCreator", () => {
        test("it returns successful response with 200 status code", async () => {
            const testEvents = testEventData;
            jest.spyOn(Event, "findByCreator").mockResolvedValueOnce(
                testEvents
            );
            const mockReq = {
                params: {
                    user_id: 1,
                },
            };
            await userController.findEventsByCreator(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 404 in case of error", async () => {
            jest.spyOn(Event, "findByCreator").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                params: {
                    user_id: 1,
                },
            };
            await userController.findEventsByCreator(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
        });
    });

    describe("findEventsByAttendeeName", () => {
        test("it returns successful response with 200 status code", async () => {
            const testEvents = testEventData;
            jest.spyOn(User, "findByName").mockResolvedValueOnce({ id: 1 });
            jest.spyOn(Event, "findByAttendeeId").mockResolvedValueOnce(
                testEvents
            );
            jest.spyOn(filters, "applyQueryFilters").mockResolvedValueOnce(
                testEvents
            );
            jest.spyOn(filters, "filterByCouncil").mockResolvedValueOnce(
                testEvents
            );
            const mockReq = {
                params: {
                    user_name: "test%20name",
                },
                headers: {
                    authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.7DXwNbHtZoPUCoGv_Odt-jIOY2bBJDhBJeZKwpWCvCM",
                },
            };
            await userController.findEventsByAttendeeName(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 404 in case of error", async () => {
            jest.spyOn(User, "findByName").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                params: {
                    user_name: "test%20name",
                },
            };
            await userController.findEventsByAttendeeName(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(404);
        });
    });

    describe("updateUser", () => {
        test("it returns successful response with 200 status code", async () => {
            const testUser = testUserData[0];
            jest.spyOn(User, "updateUser").mockResolvedValueOnce(testUser);
            const mockReq = {
                params: {
                    user_id: "test ID",
                },
            };
            await userController.updateUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 400 in case of error", async () => {
            jest.spyOn(User, "updateUser").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                params: {
                    user_id: "test ID",
                },
            };
            await userController.updateUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(400);
        });
    });

    describe("deleteUser", () => {
        test("it returns successful response with 200 status code", async () => {
            jest.spyOn(User, "deleteUser").mockResolvedValueOnce(
                "User deleted"
            );
            const mockReq = {
                params: {
                    user_id: "test ID",
                },
            };
            await userController.deleteUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 400 in case of error", async () => {
            jest.spyOn(User, "deleteUser").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = {
                params: {
                    user_id: "test ID",
                },
            };
            await userController.deleteUser(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(400);
        });
    });
});
