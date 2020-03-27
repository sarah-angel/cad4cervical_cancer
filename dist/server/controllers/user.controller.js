'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _dbErrorHandler = require('./../helpers/dbErrorHandler');

var _dbErrorHandler2 = _interopRequireDefault(_dbErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* Creates a new user with the user JSON object in the request
* within req.body
* user.save saves the new user to database after Mongoose validates.
*/
var create = function create(req, res, next) {
    var user = new _user2.default(req.body);
    user.save(function (err, result) {
        if (err) {
            return res.status(400).json({
                error: _dbErrorHandler2.default.getErrorMessage(err)
            });
        }
        res.status(200).json({
            message: "Successfully signed up!"
        });
    });
};

exports.default = { create: create };