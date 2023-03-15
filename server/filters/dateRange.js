module.exports = function dateRangeFilter(startDate, endDate, events) {
    let filteredEvents = events.filter(
        (event) =>
            event.date_occurring.valueOf() >= startDate &&
            event.date_occurring.valueOf() < endDate
    );
    return filteredEvents;
};
