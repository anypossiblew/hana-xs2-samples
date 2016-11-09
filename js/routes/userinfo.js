var express = require('express');
var router = express.Router();
var userInfoQuery = require('./userinfoQuery');

router.get('/rest/userinfo', function (req, res) {
    userInfoQuery(req.user, function(error, result) {
        if(error) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.end('{}');
        }
        else {
            console.log(JSON.stringify(result, null, 4));
            res.end(JSON.stringify(result, null, 4));
        }
    });
});
module.exports = router;
