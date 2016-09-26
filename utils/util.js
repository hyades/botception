exports.isSet = function (val) {
    switch (typeof val) {
        case "string":
            return val !== undefined && val !== "" && val !== null && val !== "NA";
        case "object":
            if (val === null) {
                return false;
            }
            if (val.constructor === Array) {
                return val.length !== 0;
            }
            return Object.keys(val).length !== 0;
        case "number":
            return val !== -1;
        case "boolean":
            return val;
        default:
            return false;
    }
};