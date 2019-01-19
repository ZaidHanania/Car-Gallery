'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _data = require('./data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.static('client'));

app.get('/', function (req, res) {
  res.sendFile(_path2.default.resolve(__dirname, 'client/index.html'));
});

app.get('/cars', function (req, res) {
  res.json(_data.data.cars);
});

app.get('*', function (req, res) {
  res.send({
    errorMessage: 'Unknown request'
  });
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});