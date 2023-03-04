export default function (lowerDate, upperDate) {
    lowerDate = new Date(lowerDate);
    upperDate = new Date(upperDate);
    let filteredEvents;
    filteredEvents = events.filter(
        (event) =>
            event.dateOccuring >= lowerDate && event.dateOccuring < upperDate
    );
    return filteredEvents;
}
