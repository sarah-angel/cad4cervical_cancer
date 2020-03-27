'use strict';

var _config = require('./../config/config');

var _config2 = _interopRequireDefault(_config);

var _express = require('./express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose2.default.Promise = global.Promise; //use ES6 promises
_mongoose2.default.connect(_config2.default.mongoUri);
_mongoose2.default.connection.on('error', function () {
    throw new Error('Unable to connect to database');
});

_express2.default.listen(_config2.default.port, function onStart(err) {
    if (err) {
        console.log(err);
    }

    console.info("Server started on port " + _config2.default.port);
});