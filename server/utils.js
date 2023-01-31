function generateUpdateQueryString(userData) {
    let sqlQueryString = [`UPDATE users SET`];
    let setStringValues = [];
    Object.keys(userData)
        .shift()
        .forEach(function (key, i) {
            setStringValues.push(key + " = ($" + (i + 1) + ")");
        });
    sqlQueryString.push(setStringValues.join(", "));
    sqlQueryString.push(`WHERE id = $1 RETURNING *;`);
    return sqlQueryString.join(" ");
}

module.exports = {
    generateUpdateQueryString,
};
