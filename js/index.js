'use strict';
var express = require('express');
var hdbext = require('sap-hdbext');
var routes = require('./routes/userinfo');

var PORT = process.env.PORT || 3001;
var app = express();

app.use('/', hdbext.middleware(), routes);

//start the HTTP server
app.listen(PORT, function () {
    console.log('Server running on http://localhost:' + PORT);
});
