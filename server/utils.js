const jwt_decode = require("jwt-decode");

function generateUpdateQueryStringUsers(userData) {
    let sqlQueryString = [`UPDATE users SET`];
    let setStringValues = [];
    let keys = Object.keys(userData);
    keys.shift();
    keys.forEach(function (key, i) {
        setStringValues.push(key + " = ($" + (i + 1) + ")");
    });
    sqlQueryString.push(setStringValues.join(", "));
    sqlQueryString.push(`WHERE id = $1 RETURNING *;`);
    return sqlQueryString.join(" ");
}

function generateUpdateQueryStringEvents(eventData) {
    let sqlQueryString = [`UPDATE events SET`];
    let setStringValues = [];
    let keys = Object.keys(eventData);
    keys.shift();
    keys.forEach(function (key, i) {
        setStringValues.push(key + " = ($" + (i + 1) + ")");
    });
    sqlQueryString.push(setStringValues.join(", "));
    sqlQueryString.push(`WHERE id = $1 RETURNING *;`);
    return sqlQueryString.join(" ");
}

function generateFindByAttendeeIdQueryString(attendeeId) {
    // take the ID of arrays from model and generate an SQL query string from it
    let setStringValues = join("','", attendeeId);
    let sqlQueryString = [
        `SELECT events.* FROM attendees JOIN events ON attendees.event_id=events.id WHERE id IN ('$setStringValues')`,
    ];
    // sqlQueryString.push(setStringValues)
    return sqlQueryString;
}

function decodeJwtToken(token) {
    let decodedToken = jwt_decode(token);
    return decodedToken;
}

module.exports = {
    generateUpdateQueryStringUsers,
    generateUpdateQueryStringEvents,
    generateFindByAttendeeIdQueryString,
    decodeJwtToken,
};
