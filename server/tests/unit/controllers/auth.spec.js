require("dotenv").config();

const authController = require("../../../controllers/authController");
const User = require("../../../models/userModel");

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
            jest.spyOn(User, "findByEmail").mockResolvedValue({
                email: testUserData.email,
            });
            jest.spyOn(
                User.prototype,
                "passwordHash",
                "get"
            ).mockImplementation(() => testPswrd);
            // jest.spyOn(User.Prototype, "passwordHash").mockResolvedValueOnce(
            //     testPswrd
            // );
            jest.spyOn(bcryptjs, "compare").mockResolvedValueOnce(true);
            jest.spyOn(jwt, "sign").mockResolvedValue("testtoken");
            const mockReq = { body: testUserData };
            await authController.login(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalled();
        });

        test("it responds with 401 if no email sent in request body", async () => {
            const testUser = {
                password: "testword",
            };
            const mockReq = { body: testUser };
            await authController.login(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(401);
        });

        test("it responds with 401 if no password sent in request body", async () => {
            const testUser = {
                email: "testemail@email.com",
            };
            const mockReq = { body: testUser };
            await authController.login(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(401);
        });

        test("it responds with code 401 in case of invalid password", async () => {
            const testUser = {
                email: "testemail@email.com",
                password: "testword",
            };
            jest.spyOn(User, "findByEmail").mockResolvedValue(
                new User(testUser)
            );
            jest.spyOn(bcryptjs, "compare").mockResolvedValueOnce(false);
            const mockReq = { body: testUser };
            await authController.login(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(401);
        });

        test("it responds with code 401 in case of no user", async () => {
            const testUser = {
                username: "tester",
                password: "testword",
            };
            jest.spyOn(User, "findByEmail").mockResolvedValue(null);
            const mockReq = { body: testUser };
            await authController.login(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(401);
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
});
