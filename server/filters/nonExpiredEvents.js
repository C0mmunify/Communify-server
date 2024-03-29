module.exports = function nonExpiredFilter(events) {
    const currentTime = new Date();
    const filteredEvents = events.filter(
        (event) => event.dateEnding < currentTime
    );
    return filteredEvents;
};
