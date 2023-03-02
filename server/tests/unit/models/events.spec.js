const Event = require("../../../models/eventModel");
const pg = require("pg");
jest.mock("pg");

const db = require("../../../dbConfig");

const testEvents = require("../testEventSeeds.json");
const testUsers = require("../testUserSeeds.json");

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

        test("it resolves with error message on failure", async () => {
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(Event.findAllEvents()).rejects.toBeInstanceOf(Error);
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

        test("it resolves with error message on failure", async () => {
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(Event.findById(1)).rejects.toBeInstanceOf(Error);
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

        test("it resolves with error message on failure", async () => {
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(
                Event.findByTitle("Example Event 1")
            ).rejects.toBeInstanceOf(Error);
        });
    });

    describe("findByCreator", () => {
        test("it resolves with event data on successful db query", async () => {
            let mockCreatorId = testEvents[1].creator_id;
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [testEvents[1], testEvents[2]],
            });
            const result = await Event.findByCreator(mockCreatorId);
            expect(result).toHaveLength(2);
            expect(result[0].title).toBe("Example Event 2");
        });

        test("it resolves with error message on failure", async () => {
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(Event.findByCreator(1)).rejects.toBeInstanceOf(Error);
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

        test("it resolves with error message on failure", async () => {
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(Event.findByAttendeeId(1)).rejects.toBeInstanceOf(
                Error
            );
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

        test("it resolves with error message on failure", async () => {
            let mockEventData = testEvents[0];
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(
                Event.createEvent(mockEventData)
            ).rejects.toBeInstanceOf(Error);
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

        test("it resolves with error message on failure", async () => {
            let mockEventData = {
                description: "updated description",
            };
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(
                Event.updateEvent(mockEventData)
            ).rejects.toBeInstanceOf(Error);
        });
    });

    describe("deleteEvent", () => {
        test("it resolves with successful deletion message", async () => {
            let mockEvent = testEvents[0];
            jest.spyOn(db, "query").mockResolvedValueOnce("User deleted");
            const result = await Event.deleteEvent(mockEvent.id);
            expect(result).toMatch("Event deleted");
        });

        test("it resolves with error message on failure", async () => {
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(Event.deleteEvent(1)).rejects.toBeInstanceOf(Error);
        });
    });

    describe("getAttendees", () => {
        test("it resolves with attendees", async () => {
            let event = new Event(testEvents[0]);
            jest.spyOn(db, "query").mockResolvedValueOnce({ rows: testUsers });
            const result = await event.getAttendees();
            expect(result).toHaveLength(5);
        });

        test("it resolves with error message on failure", async () => {
            let event = new Event(testEvents[0]);
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(event.getAttendees).rejects.toBeInstanceOf(Error);
        });
    });

    describe("checkAttendance", () => {
        test("it resolves with false if user is not attending", async () => {
            let event = new Event(testEvents[0]);
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [],
            });
            const result = await event.checkAttendance(1);
            expect(result).not.toBeTruthy();
        });

        test("it resolves with true if user is attending", async () => {
            let event = new Event(testEvents[0]);
            jest.spyOn(db, "query").mockResolvedValueOnce({
                rows: [testUsers[2]],
            });
            const result = await event.checkAttendance(3);
            expect(result).toBeTruthy();
        });

        test("it resolves with error message on failure", async () => {
            let event = new Event(testEvents[0]);
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(event.checkAttendance(1)).rejects.toBeInstanceOf(
                Error
            );
        });
    });

    describe("addAttendee", () => {
        test("it resolves with success message", async () => {
            let event = new Event(testEvents[0]);
            jest.spyOn(db, "query").mockResolvedValueOnce("Success");
            const result = await event.addAttendee(1);
            expect(result).toMatch(/success/i);
        });

        test("it resolves with error message on failure", async () => {
            let event = new Event(testEvents[0]);
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(event.addAttendee(123)).rejects.toBeInstanceOf(Error);
        });
    });

    describe("deleteAttendee", () => {
        test("it resolves with success message", async () => {
            let event = new Event(testEvents[0]);
            jest.spyOn(db, "query").mockResolvedValueOnce("Success");
            const result = await event.deleteAttendee(1);
            expect(result).toMatch(/success/i);
        });

        test("it resolves with error message on failure", async () => {
            let event = new Event(testEvents[0]);
            jest.spyOn(db, "query").mockImplementation(() => {
                throw new Error();
            });
            return expect(event.deleteAttendee(123)).rejects.toBeInstanceOf(
                Error
            );
        });
    });
});
