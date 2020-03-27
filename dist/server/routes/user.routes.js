'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('../controllers/user.controller');

var _user2 = _interopRequireDefault(_user);

var _auth = require('../controllers/auth.controller');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//create new user with POST
router.route('/api/users').post(_user2.default.create);

exports.default = router;