const { DecodeJwtToken } = require("../utilities/authUtils");
const councilFilter = require("../filters/councilArea");

function filterByCouncil(req, data) {
    let userData = DecodeJwtToken(req.headers["authorization"].split(" ")[1]);
    let localArea = userData.filterByCouncil;
    let filteredData = councilFilter(localArea, data);
    return filteredData;
}

module.exports = {
    filterByCouncil,
};
