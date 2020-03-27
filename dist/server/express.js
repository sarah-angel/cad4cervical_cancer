'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _user = require('./routes/user.routes');

var _user2 = _interopRequireDefault(_user);

var _auth = require('./routes/auth.routes');

var _auth2 = _interopRequireDefault(_auth);

var _patient = require('./routes/patient.routes');

var _patient2 = _interopRequireDefault(_patient);

var _radiology = require('./routes/radiology.routes');

var _radiology2 = _interopRequireDefault(_radiology);

var _consultation = require('./routes/consultation.routes');

var _consultation2 = _interopRequireDefault(_consultation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)({
    origin: '*'
}));

app.use(_bodyParser2.default.json({
    limit: 500000
}));

app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.use((0, _cookieParser2.default)());
app.use((0, _compression2.default)());
app.use((0, _helmet2.default)());

//Catch UnauthorizedError thrown by express-jwt when
//can't validate token
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({
            error: err.name + ": " + err.message
        });
    }

    next();
});

app.use(_express2.default.static(__dirname + 'public'));

// //production mode
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static(path.join(__dirname, '../../client/build')))
//     app.get('/', (req, res) => {
//         res.sendFile(path.join(__dirname, '../../client/build/index.html'))
//     })
// }

app.use(_express2.default.static(_path2.default.join(__dirname, '../../client/build')));
app.get('/', function (req, res) {
    res.sendFile(_path2.default.join(__dirname, '../../client/build/index.html'));
});

app.use('/', _user2.default);
app.use('/', _auth2.default);
app.use('/', _patient2.default);
app.use('/', _radiology2.default);
app.use('/', _consultation2.default);

exports.default = app;