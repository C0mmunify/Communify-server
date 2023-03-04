const { DecodeJwtToken } = require("../utilities/authUtils");
const councilFilter = require("../filters/councilArea");
const dateRangeFilter = require("../filters/dateRange");
const nonExpiredFilter = require("../filters/nonExpiredEvents");

function filterByCouncil(req, data) {
    let userData = DecodeJwtToken(req.headers["authorization"].split(" ")[1]);
    let localArea = userData.filterByCouncil;
    let filteredData = councilFilter(localArea, data);
    return filteredData;
}

function applyQueryFilters(req, data) {
    let filteredData;
    const queryParams = req.query;

    if (!!queryParams.startDate || !!queryParams.endDate) {
        lowerDate = queryParams.startDate
            ? !undefined
            : new Date("1970-01-01T00:00:00.000Z");
        upperDate = queryParams.endDate ? !undefined : new Date();
        filteredData = dateRangeFilter(lowerDate, upperDate, data);
    }

    if (!!queryParams.notExpired) {
        filteredData = nonExpiredFilter(data);
    }

    return filteredData;
}

module.exports = {
    filterByCouncil,
    applyQueryFilters,
};
