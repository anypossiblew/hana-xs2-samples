'use strict';
var express = require('express');
var hdbext = require('sap-hdbext');
var userinfo = require('./routes/userinfo');
var testdata = require('./routes/testdata');
var addressbook = require('./routes/addressbook');
var passport = require('passport');
var JWTStrategy = require('sap-xssec').JWTStrategy;
var xsenv = require('sap-xsenv');

var PORT = process.env.PORT || 3001;
var app = express();

passport.use(new JWTStrategy(xsenv.getServices({uaa:{tag:'xsuaa'}}).uaa));

//use passport for authentication
app.use(passport.initialize());

app.use('/',
  passport.authenticate('JWT', { session: false }),
  hdbext.middleware(),
  userinfo, testdata, addressbook);

//start the HTTP server
app.listen(PORT, function () {
    console.log('Server running on http://localhost:' + PORT);
});
