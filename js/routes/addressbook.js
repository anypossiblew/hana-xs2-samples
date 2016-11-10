var express = require('express');
var router = express.Router();
var addressbookManager = require('./addressbookManager');

router.get('/rest/addressbook/tree', function (req, res) {
    addressbookManager(req.db, function(error, result) {
        if (error) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            console.error(error);
            res.end('{}');
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({books: result}));
        }
    });
});
module.exports = router;
