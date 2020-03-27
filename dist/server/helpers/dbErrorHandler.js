'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * This will parse and return the error message associated with
 * the specific validation error that occured while querying MongoDB using Mongoose
 */

var getErrorMessage = function getErrorMessage(err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err);
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};

/**
 * Parse errors due to violation of the unique constraint
 */
var getUniqueErrorMessage = function getUniqueErrorMessage(err) {
    var output = void 0;
    try {
        var fieldName = err.message.substring(err.message.lastIndexOf('.$') + 2, err.message.lastIndexOf('_1'));
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' already exists';
    } catch (ex) {
        output = 'Unique field already exists';
    }
    return output;
};

exports.default = { getErrorMessage: getErrorMessage };