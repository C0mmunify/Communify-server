const User = require("../../../models/userModel");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig");

const testUsers = require("../testUserSeeds.json");
const testAuthData = require("../testAuthSeeds.json");

describe("User Model", () => {
    beforeEach(() => jest.clearAllMocks());

    afterEach(() => jest.resetAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe("findById", () => {
        test("it resolves with user data on successful db query", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [testUsers[0]],
            });
            const result = await User.findById(1);
            expect(result).toBeInstanceOf(User);
            expect(result.id).toBe(1);
        });

        test("it resolves with user data on successful db query", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [testUsers[1]],
            });
            const result = await User.findById(2);
            expect(result).toBeInstanceOf(User);
            expect(result.id).toBe(2);
        });
    });

    describe("findByEmail", () => {
        test("it resolves with user data on successful db query", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: testUsers });
            const result = await User.findByEmail("testuser1@email.com");
            expect(result).toBeInstanceOf(User);
            expect(result.email).toBe("testuser1@email.com");
        });

        test("it resolves with user data on successful db query", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [testUsers[1]],
            });
            const result = await User.findByEmail("testuser2@email.com");
            expect(result).toBeInstanceOf(User);
            expect(result.email).toBe("testuser2@email.com");
        });
    });

    describe("create", () => {
        test("it resolves with newly created user data", async () => {
            let newUser = {
                name: "Test User 1",
                email: "testuser1@email.com",
                phone: 1234567890,
                age: 14,
                council: "Test Council 3",
                admin: false,
            };
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [{ ...newUser, id: 1 }],
            });
            const result = await User.create(newUser);
            expect(result).toBeInstanceOf(User);
            expect(result).toHaveProperty("id");
            expect(result.id).toBe(1);
        });
    });

    describe("update", () => {
        test("it resolves with updated user data", async () => {
            let userData = {
                id: 1,
                name: "Test User 1",
                email: "oldemail@email.com",
                phone: 1234567890,
                age: 14,
                council: "Test Council 3",
                admin: false,
            };
            let user = new User(userData);
            // let updatedUser = {
            //     id: 1,
            //     name: "Test User 1",
            //     email: "newemail@email.com",
            //     phone: 1234567890,
            //     age: 14,
            //     council: "Test Council 3",
            //     admin: false,
            // };
            expect(user.email).toBe("oldemail@email.com");
            let updatedUserData = {
                ...userData,
                email: "newemail@email.com",
            };
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [updatedUserData],
            });
            const result = await user.update(updatedUserData);
            expect(result).toBeInstanceOf(User);
            expect(result.id).toBe(1);
            expect(result.email).toBe("newemail@email.com");
        });
    });

    describe("getPasswordHash", () => {
        test("it resolves with user 1's password hash", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [testAuthData[0]],
            });
            let testUser = new User(testUsers[0]);
            let password = await testUser.passwordHash;
            expect(password).toBe(
                "$2y$10$Trhr2m0E9XhGjIxwc89eaeIBc23ELsdMowRcGY93ib1mI/3k9cPM6"
            );
        });

        test("it resolves with user 4's password hash", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [testAuthData[3]],
            });
            let testUser = new User(testUsers[3]);
            let password = await testUser.passwordHash;
            expect(password).toBe(
                "$2y$10$OLlRRqQESeexFJBhSggWDOs3BPwrstPxsP5cfBn3OUAcWevNg0I0u"
            );
        });
    });

    describe("createPassword", () => {
        test("it resolved with creation message on successful db query", async () => {
            let testPassword = "testpassword";
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [],
            });
            let testUser = new User(testUsers[0]);
            const result = await testUser.createPassword(testPassword);
            expect(result).toContain("Password created.");
        });
    });

    describe("updatePassword", () => {
        test("it resolved with update message on successful db query", async () => {
            let testPassword = "newtestpassword";
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [],
            });
            let testUser = new User(testUsers[0]);
            const result = await testUser.updatePassword(testPassword);
            expect(result).toContain("Password updated successfully.");
        });
    });
});
