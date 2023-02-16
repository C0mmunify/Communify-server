const Event = require("../../../models/eventModel");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig");

const testEvents = require("../testEventSeeds.json");

describe("Event Model", () => {
    beforeEach(() => jest.clearAllMocks());

    afterEach(() => jest.resetAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe("findAllEvents", () => {
        test("it resolves with events data on successful db query", async () => {
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: testEvents,
            });
            const result = await Event.findAllEvents(true);
            expect(result).toHaveLength(5);
        });
    });

    describe("findById", () => {
        test("it resolves with event data on successful db query", async () => {
            let mockEvent = testEvents[0];
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [mockEvent],
            });
            const result = await Event.findById(1);
            expect(result).toBeInstanceOf(Event);
            expect(result.id).toBe(1);
            expect(result.title).toMatch(/Example Event 1/);
        });

        test("it resolves with user data on successful db query", async () => {
            let mockEvent = testEvents[4];
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [mockEvent],
            });
            const result = await Event.findById(5);
            expect(result).toBeInstanceOf(Event);
            expect(result.id).toBe(5);
            expect(result.title).toMatch(/Example Event 5/);
        });

        xtest("it resolves with error message on failure", async () => {
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error("example error message");
            });
            const result = await Event.findById("fake ID");
            expect(result.message).toMatch(/No event found with given ID/);
        });
    });

    describe("findByTitle", () => {
        test("it resolves with event data on successful db query", async () => {
            let mockEvent = testEvents[1];
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [mockEvent],
            });
            const result = await Event.findByTitle("Example Event 2");
            expect(result).toBeInstanceOf(Event);
            expect(result.title).toBe("Example Event 2");
        });

        test("it resolves with event data on successful db query", async () => {
            let mockEvent = testEvents[3];
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [mockEvent],
            });
            const result = await Event.findByTitle("Example Event 4");
            expect(result).toBeInstanceOf(Event);
            expect(result.title).toBe("Example Event 4");
        });

        xtest("it resolves with error message on failure", async () => {
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error("example error message");
            });
            const result = await Event.findByTitle("fake title");
            expect(result).toMatch(/No event found with given title/);
        });
    });

    describe("findByAttendeeId", () => {
        test("it resolves with event data on successful db query v1", async () => {
            let mockEvents = testEvents.slice(0, 2);
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: mockEvents,
            });
            const result = await Event.findByAttendeeId(1);
            expect(result).toHaveLength(2);
            expect(result[0]).toBeInstanceOf(Event);
            expect(result[1]).toBeInstanceOf(Event);
        });

        test("it resolves with event data on successful db query v2", async () => {
            let mockEvents = [testEvents[1], testEvents[3]];
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: mockEvents,
            });
            const result = await Event.findByAttendeeId(2);
            expect(result).toHaveLength(2);
            expect(result[0]).toBeInstanceOf(Event);
            expect(result[1]).toBeInstanceOf(Event);
        });

        xtest("it resolves with error message on failure", async () => {
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error("example error message");
            });
            const result = await User.findById("fake ID");
            expect(result.message).toMatch(/No events found for given user/);
        });
    });

    describe("createEvent", () => {
        test("it resolves with newly created user data", async () => {
            let newEvent = {
                title: "Example Event 1",
                description: "This is an example event 1.",
                location: "example location 1",
                council: "council 1",
                creator_id: 1,
                spaces_total: 3,
                spaces_remaining: 2,
                date_created: "2023-01-23 00:00:00",
                date_occurring: "2023-01-28 12:00:00",
            };
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [{ ...newEvent, id: 1 }],
            });
            const result = await Event.createEvent(newEvent);
            expect(result).toBeInstanceOf(Event);
            expect(result).toHaveProperty("id");
            expect(result.id).toBe(1);
        });

        xtest("it resolves with error message on failure", async () => {
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error("example error message");
            });
            const result = await User.createUser({});
            expect(result.message).toMatch(/Event Creation Failed/);
        });
    });

    describe("updateEvent", () => {
        test("it resolves with updated user data", async () => {
            let updatedEventData = {
                ...testEvents[0],
                description: "new description",
            };
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [updatedEventData],
            });
            const result = await Event.updateEvent(updatedEventData);
            expect(result).toBeInstanceOf(Event);
            expect(result.id).toBe(1);
            expect(result.description).toBe("new description");
        });

        xtest("it resolves with error message on failure", async () => {
            let testUser = new User();
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error("example error message");
            });
            const result = await testUser.update({});
            expect(result).toBeInstanceOf(Error);
        });
    });

    describe("deleteEvent", () => {
        test("it resolves with successful deletion message", async () => {
            let mockEvent = testEvents[0];
            jest.spyOn(db, "query").mockResolvedValueOnce("User deleted");
            const result = await Event.deleteEvent(mockEvent.id);
            expect(result).toMatch("Event deleted");
        });

        xtest("it resolves with error message on failure", async () => {
            let testUser = new User();
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error("example error message");
            });
            const result = await testUser.update({});
            expect(result).toMatch(/Failed to delete event/);
        });
    });
});
