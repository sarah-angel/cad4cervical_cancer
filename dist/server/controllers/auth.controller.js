'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _config = require('./../../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Authenticates a user 
 * Retrieves user with matching email from the database
 * Verifies password and if successful,
 * Generates JWT signed with secret key and user's _id
 * Returns signed JWT and user details in res
 */
var signin = function signin(req, res) {
    _user2.default.findOne({
        "username": req.body.username
    }, function (err, user) {
        if (err || !user) return res.status(401).json({
            error: 'User not found'
        });
        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({
                error: 'Authentication failed.'
            });
        }

        var token = _jsonwebtoken2.default.sign({
            _id: user._id
        }, _config2.default.jwtSecret);

        return res.json({
            token: token,
            user: { _id: user._id, username: user.username, department: user.department }
        });
    });
};

/**
 * Verifies that incoming requests have valid JWT in 
 * Authorization header
 * If token is valid, it appends user's ID in auth key
 */
var requireSignin = (0, _expressJwt2.default)({
    secret: _config2.default.jwtSecret,
    userProperty: 'auth'
});

exports.default = { signin: signin, requireSignin: requireSignin };