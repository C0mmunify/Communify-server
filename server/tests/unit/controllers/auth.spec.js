require("dotenv").config();

const authController = require("../../../controllers/authController");
const User = require("../../../models/userModel");

const testUserData = require("../testUserSeeds.json");

// Need to mock out bcrypt
const bcryptjs = require("bcryptjs");
jest.mock("bcryptjs");

// Need to mock out JWT
const jwt = require("jsonwebtoken");
jest.mock("jsonwebtoken");

const mockSend = jest.fn();
const mockJson = jest.fn((message) => ({}));
const mockStatus = jest.fn((statusCode) => ({
    send: mockSend,
    json: mockJson,
}));
const mockRes = { status: mockStatus };

describe("auth controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.resetAllMocks();
    });

    describe("login", () => {
        test("it to resolve with token and status code 200", async () => {
            const testPswrd =
                "$2y$10$N7sYEhMcOs3WAVUjWP5tzedsZdPVK8/1VACETular4N9R/CEKZ5g6";
            const testUserData = {
                email: "testuser@email.com",
                password: "testpassword",
            };
            jest.spyOn(User, "findByEmail").mockResolvedValueOnce(
                new User({
                    email: testUserData.email,
                })
            );
            jest.spyOn(
                User.prototype,
                "passwordHash",
                "get"
            ).mockResolvedValueOnce(testPswrd);
            jest.spyOn(bcryptjs, "compare").mockResolvedValueOnce(true);
            jest.spyOn(jwt, "sign").mockResolvedValueOnce("testtoken");
            const mockReq = { body: testUserData };
            await authController.login(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalled();
        });

        test("it responds with 400 if no email sent in request body", async () => {
            const testUser = {
                password: "testword",
            };
            const mockReq = { body: testUser };
            await authController.login(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(400);
        });

        test("it responds with 400 if no password sent in request body", async () => {
            const testUser = {
                email: "testemail@email.com",
            };
            const mockReq = { body: testUser };
            await authController.login(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(400);
        });

        test("it responds with code 401 in case of invalid password", async () => {
            const testPswrd =
                "$2y$10$N7sYEhMcOs3WAVUjWP5tzedsZdPVK8/1VACETular4N9R/CEKZ5g6";
            const testUser = {
                email: "testemail@email.com",
                password: "testword",
            };
            jest.spyOn(User, "findByEmail").mockResolvedValueOnce(
                new User({ email: testUser.email })
            );
            jest.spyOn(
                User.prototype,
                "passwordHash",
                "get"
            ).mockResolvedValueOnce(testPswrd);
            jest.spyOn(bcryptjs, "compare").mockResolvedValueOnce(false);
            const mockReq = { body: testUser };
            await authController.login(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(401);
        });

        test("it responds with code 500 in case of no user", async () => {
            const testUser = {
                email: "tester",
                password: "testword",
            };
            jest.spyOn(User, "findByEmail").mockResolvedValue(undefined);
            const mockReq = { body: testUser };
            await authController.login(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        });
    });

    describe("register", () => {
        test("it returns success message with 201 status code", async () => {
            const testUser = {
                username: "tester",
                password: "testword",
            };
            jest.spyOn(User, "findByEmail").mockResolvedValueOnce(false);
            jest.spyOn(User, "createUser").mockResolvedValue("User created!");
            const mockReq = { body: testUser };
            await authController.register(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
        });

        test("it responds with code 500 if user already exists", async () => {
            const testUser = {
                username: "tester",
                password: "testword",
            };
            jest.spyOn(User, "findByEmail").mockResolvedValueOnce(true);
            const mockReq = { body: testUser };
            await authController.register(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        });

        test("it responds with code 500 in case of error", async () => {
            const testUser = {
                username: "tester",
                password: "testword",
            };
            jest.spyOn(User, "createUser").mockImplementation(() => {
                throw new Error();
            });
            const mockReq = { body: testUser };
            await authController.register(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        });
    });

    describe("updatePassword", () => {
        test("it returns successful response with 200 status code", async () => {
            const testUser = new User(testUserData[0]);
            jest.spyOn(User, "findById").mockResolvedValueOnce(
                new User(testUser)
            );
            jest.spyOn(User.prototype, "updatePassword").mockResolvedValueOnce(
                "Password updated successfully."
            );
            const mockReq = {
                body: {
                    old_password: "Password",
                    new_password: "newPassword",
                    confirm_password: "newPassword",
                },
                params: {
                    user_id: "test ID",
                },
            };
            await authController.updatePassword(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        });

        test("it responds with code 400 in case of error", async () => {
            jest.spyOn(User.prototype, "updatePassword").mockImplementation(
                () => {
                    throw new Error();
                }
            );
            const mockReq = {
                body: {
                    old_password: "Password",
                    new_password: "newPassword",
                    confirm_password: "newPassword",
                },
                params: {
                    user_id: "test ID",
                },
            };
            await authController.updatePassword(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(500);
        });
    });
});
