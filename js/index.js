'use strict';
var express = require('express');
var routes = require('./routes/userinfo');

var PORT = process.env.PORT || 3000;
var app = express();

app.use('/', routes);

//start the HTTP server
app.listen(PORT, function () {
    console.log('Server running on http://localhost:' + PORT);
});
