var cds = require('sap-cds');
var async = require('async');

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

function addressbookManager(dbConnection, appCallback) {
    async.waterfall([
        init,
        function connect(cb) {
            // reuse connection attached to HTTP request
            cds.$getTransaction(dbConnection, cb);
        },
        function queryBooksFromDatabase(tx, cb) {
            BOOK.$query()
                .$project({
                    $all: true,
                    addresses: {id: true, first_name: true, last_name: true, phone: true, city: true}
                })
                .$execute(tx, {$factorized: true}, function (err, result) {
                    cb(err, tx, result);
                });
        },
        function release(tx, result, cb) {
            tx.$close();
            cb(null, result);
        },
        function transformArrayToObject(databaseResult, cb) {
            cb(null, databaseResult.reduce(function (result, obj) {
                result[obj.id] = obj;
                delete obj.id;
                if (obj.addresses) {
                    obj.addresses.forEach(function (a) {
                        obj[a.id] = a;
                        a.name = a.first_name + " " + a.last_name;
                    });
                    delete obj.addresses;
                }
                return result;
            }, {name: "root"}));
        }
    ], function (error, result) {
        appCallback(error, result);
    });
}
module.exports = addressbookManager;
