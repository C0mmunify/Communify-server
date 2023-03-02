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

    describe("findAllUsers", () => {
        test("it resolves with user data on successful db query", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: testUsers,
            });
            const result = await User.findAllUsers();
            expect(result).toHaveLength(5);
        });

        test("it resolves with error message on failure", async () => {
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(User.findAllUsers()).rejects.toBeInstanceOf(Error);
        });
    });

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

        test("it resolves with error message on failure", async () => {
            let testId = 1;
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(User.findById(testId)).rejects.toBeInstanceOf(Error);
        });
    });

    describe("findByName", () => {
        test("it resolves with user data on successful db query", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [testUsers[0]],
            });
            const result = await User.findByName("Test User 1");
            expect(result).toBeInstanceOf(User);
            expect(result.id).toBe(1);
        });

        test("it resolves with user data on successful db query", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [testUsers[1]],
            });
            const result = await User.findByName("Test User 2");
            expect(result).toBeInstanceOf(User);
            expect(result.id).toBe(2);
        });

        test("it resolves with error message on failure", async () => {
            let testName = "faketestguy";
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(User.findByName(testName)).rejects.toBeInstanceOf(
                Error
            );
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

        test("it resolves with undefined when no user found", async () => {
            jest.spyOn(db, "query").mockImplementation(() => ({ rows: [] }));
            const result = await User.findByEmail("fake email");
            expect(result).not.toBeDefined();
        });

        test("it resolves with error message on failure", async () => {
            let testEmail = "test@email.com";
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(User.findByEmail(testEmail)).rejects.toBeInstanceOf(
                Error
            );
        });
    });

    describe("createUser", () => {
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
            jest.spyOn(User.prototype, "createPassword").mockResolvedValueOnce(
                {}
            );
            const result = await User.createUser(newUser);
            expect(result).toBeInstanceOf(User);
            expect(result).toHaveProperty("id");
            expect(result.id).toBe(1);
        });

        test("it resolves with error message on failure", async () => {
            let testUser = testUsers[0];
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(User.createUser(testUser)).rejects.toBeInstanceOf(
                Error
            );
        });
    });

    describe("updateUser", () => {
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
            let updatedUserData = {
                ...userData,
                email: "newemail@email.com",
            };
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [updatedUserData],
            });
            const result = await User.updateUser(updatedUserData);
            expect(result).toBeInstanceOf(User);
            expect(result.id).toBe(1);
            expect(result.email).toBe("newemail@email.com");
        });

        test("it resolves with error message on failure", async () => {
            let updatedUserInfo = {
                email: "newemail@email.com",
            };
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(
                User.updateUser(updatedUserInfo)
            ).rejects.toBeInstanceOf(Error);
        });
    });

    describe("deleteUser", () => {
        test("it resolves with successful deletion message", async () => {
            let userData = {
                id: 1,
                name: "Test User 1",
                email: "testuser@email.com",
                phone: 1234567890,
                age: 14,
                council: "Test Council 3",
                admin: false,
            };
            jest.spyOn(db, "query").mockResolvedValueOnce("User deleted");
            const result = await User.deleteUser(userData.id);
            expect(result).toMatch("User deleted");
        });

        test("it resolves with error message on failure", async () => {
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(User.deleteUser(1)).rejects.toBeInstanceOf(Error);
        });
    });

    describe("get passwordHash", () => {
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

        test("it resolves with error message on failure", async () => {
            let user = new User(testUsers[0]);
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(user.passwordHash).rejects.toBeInstanceOf(Error);
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

        test("it resolves with error message on failure", async () => {
            let newPassword = "example";
            let user = new User(testUsers[0]);
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(
                user.createPassword(newPassword)
            ).rejects.toBeInstanceOf(Error);
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

        test("it resolves with error message on failure", async () => {
            let newPassword = "example";
            let user = new User(testUsers[0]);
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(
                user.updatePassword(newPassword)
            ).rejects.toBeInstanceOf(Error);
        });
    });
});
