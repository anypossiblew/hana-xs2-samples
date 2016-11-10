'use strict';
var express = require('express');
var hdbext = require('sap-hdbext');
var userinfo = require('./routes/userinfo');
var testdata = require('./routes/testdata');
var addressbook = require('./routes/addressbook');

var PORT = process.env.PORT || 3001;
var app = express();

app.use('/', hdbext.middleware(), userinfo, testdata, addressbook);

//start the HTTP server
app.listen(PORT, function () {
    console.log('Server running on http://localhost:' + PORT);
});
