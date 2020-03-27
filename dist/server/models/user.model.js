'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = new _mongoose2.default.Schema({
    username: {
        type: String,
        trim: true,
        unique: [true, 'Username already exists'],
        required: [true, 'Username is required']
    },
    firstname: {
        type: String,
        trim: true,
        required: [true, 'First name is required']
    },
    middlename: {
        type: String,
        trim: true
    },
    surname: {
        type: String,
        trim: true,
        required: [true, 'Surname is required']
    },
    department: {
        type: String,
        trim: true,
        required: [true, 'Department is required']
    },
    hashed_password: {
        type: String,
        required: [true, 'Password is required']
    },
    salt: String
});

UserSchema.virtual('password').set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
}).get(function () {
    return this._password;
});

UserSchema.methods = {
    authenticate: function authenticate(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },
    encryptPassword: function encryptPassword(password) {
        if (!password) return '';
        try {
            return _crypto2.default.createHmac('sha1', this.salt).update(password).digest('hex');
        } catch (err) {
            return '';
        }
    },
    makeSalt: function makeSalt() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }

    /**Add validation constraints on password string
    *ensure password length is atleast six characters when new user is created or 
    *existing password is updated before storing hashed_password.
    **/
};UserSchema.path('hashed_password').validate(function (v) {
    if (this._password && this._password.length < 6) {
        this.invalidate('password', 'Password must be at least 6 characters');
    }
    if (this.isNew && !this._password) {
        this.invalidate('password', 'Password is required');
    }
}, null);

exports.default = _mongoose2.default.model('User', UserSchema);