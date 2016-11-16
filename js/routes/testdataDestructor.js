var async = require('async');
var cds = require('sap-cds');

var BOOK;
var ADDRESS;

function init(appCallback) {
    if (BOOK && ADDRESS) {
        appCallback();
    } else {
        async.waterfall([
            function (callback) {
                cds.importEntities([ {
                        $entity: "com.sap.xs2.tiven::AddressBook.Book",
                        $fields: { // for convenience we add an association from books to addresses
                            addresses: {
                                $association: {
                                    $entity: "com.sap.xs2.tiven::AddressBook.Address",
                                    $viaBacklink: "book"
                                }
                            }
                        }
                    },
                    {$entity: "com.sap.xs2.tiven::AddressBook.Address"}
                ], callback);
            },
            function (entities, callback) {
                BOOK = entities["com.sap.xs2.tiven::AddressBook.Book"];
                ADDRESS = entities["com.sap.xs2.tiven::AddressBook.Address"];
                callback(null);
            }
        ], function (error) {
            appCallback(error);
        });
    }
}

function testdataDestructor(dbConnection, securityContext, appCallback) {
    var conn = null;
    async.waterfall([
        init,
        function connect(cb) {
            // reuse connection attached to HTTP request
            cds.$getTransaction(dbConnection, cb);
        },
        function store(tx, cb) {
            conn = tx;
            cb(null);
        },
        function findAllBooks(cb) {
          conn.$find(BOOK, {}, cb);
        },
        function findAllAddresses(books, cb) {
          conn.$find(ADDRESS, {}, function(error, addresses) {
            cb(error, books.concat(addresses));
          });
        },
        function deleteAllBooks(entities, cb) {
          if (!securityContext.checkLocalScope('Delete')) {
              return cb(new Error('Insufficient permissions. You do not have the required Delete scope. '
                  +'Create a role based on the Editor role template and assign the role to a group which contains your user!'));
          }
          conn.$discardAll(entities, cb);
        },
        function release(cb) {
            conn.$close();
            cb(null);
        }
    ], appCallback);
}

module.exports = testdataDestructor;
