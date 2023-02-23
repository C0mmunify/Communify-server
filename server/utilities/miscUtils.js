function setDates(eventData) {
    eventData.date_occurring = new Date(eventData.date_occurring);
    eventData.date_ending = new Date(eventData.date_ending);
    eventData.date_created = new Date();
    return eventData;
}

module.exports = {
    setDates,
};
