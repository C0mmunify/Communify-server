const { DecodeJwtToken } = require("../utilities/authUtils");
const councilFilter = require("../filters/councilArea");
const dateRangeFilter = require("../filters/dateRange");
const nonExpiredFilter = require("../filters/nonExpiredEvents");

function filterByCouncil(req, data) {
    let userData = DecodeJwtToken(req.headers["authorization"].split(" ")[1]);
    let localArea = userData.council;
    let filteredData = councilFilter(localArea, data);
    return filteredData;
}

function applyQueryFilters(req, data) {
    const queryParams = req.query;

    if (!!queryParams.startDate || !!queryParams.endDate) {
        lowerDate = !!queryParams.startDate
            ? queryParams.startDate
            : new Date("1970-01-01T00:00:00.000Z");
        upperDate = !!queryParams.endDate ? queryParams.endDate : new Date();
        data = dateRangeFilter(lowerDate, upperDate, data);
    }

    if (!!queryParams.notExpired) {
        data = nonExpiredFilter(data);
    }

    return data;
}

module.exports = {
    filterByCouncil,
    applyQueryFilters,
};
