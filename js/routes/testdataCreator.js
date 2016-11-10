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

function testdataCreator(dbConnection, userid, appCallback) {
    var conn = null;
    async.waterfall([
        init,
        function connect(callback) {
          // reuse connection attached to HTTP request
          cds.$getTransaction(dbConnection, callback);
        },
        function store(tx, callback) {
          conn = tx;
          callback(null);
        },
        function createBook(callback) {
            var bookId = Math.floor(Math.random() * 1000000);
            conn.$save({
                $entity: BOOK,
                id: bookId,
                name: 'My Book #' + bookId + ' created by ' + userid
            }, callback);
        },
        function createAddresses(book, callback) {
            conn.$saveAll([
                {
                    $entity: ADDRESS,
                    id: Math.floor(Math.random() * 1000000),
                    book: book,
                    first_name: 'Tiven',
                    last_name: 'Wang',
                    address: 'Pudong, Chenhui road, 1001',
                    city: 'Shanghai',
                    country: 'China',
                    zip: '20001',
                    phone: '+86 21 6108 7986',
                    email: 'tiwen.wang@sap.com',
                    web: 'http://tiven.wang'
                },
                {
                    $entity: ADDRESS,
                    id: Math.floor(Math.random() * 1000000),
                    book: book,
                    first_name: 'Max',
                    last_name: 'Mustermann',
                    address: 'Dietmar-Hopp-Allee 16',
                    city: 'Walldorf',
                    country: 'Germany',
                    zip: '69169',
                    phone: '+49 6227 7 54321',
                    email: 'john.doe@sap.com',
                    web: 'https://sap.de'
                }
            ], callback);
        },
        function release(instances, callback) {
            conn.$close();
            callback(null);
        }
    ], appCallback);
}

module.exports = testdataCreator;
