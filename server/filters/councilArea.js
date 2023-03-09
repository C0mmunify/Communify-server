module.exports = function councilFilter(area, data) {
    let filteredData;
    filteredData = data.filter(
        (x) => x.council.toLowerCase() == area.toLowerCase()
    );
    return filteredData;
};
