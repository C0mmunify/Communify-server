const jwt_decode = require("jwt-decode");

function CheckAdmin(headers) {
    const token = headers["authorization"].split(" ")[1];
    let userData = DecodeJwtToken(token);
    if (userData.admin) {
        return true;
    }
    return false;
}

function DecodeJwtToken(token) {
    let decodedToken = jwt_decode(token);
    return decodedToken;
}

module.exports = {
    CheckAdmin,
    DecodeJwtToken,
};
