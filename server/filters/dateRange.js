module.exports = function dateRangeFilter(startDate, endDate, events) {
    let lowerDate = new Date(startDate);
    let upperDate = new Date(endDate);
    let filteredEvents = events.filter(
        (event) =>
            event.dateOccuring >= lowerDate && event.dateOccuring < upperDate
    );
    return filteredEvents;
};
