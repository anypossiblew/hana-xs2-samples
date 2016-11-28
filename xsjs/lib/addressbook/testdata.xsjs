// Import the bookManager library
$.import("addressbook", "bookManager");

$.response.contentType = "application/json";

var bookId = Math.floor(Math.random() * 1000000);
var book = {
  id: bookId,
  name: 'My Book #' + bookId + ' by ' + $.session.getUsername()
}

$.addressbook.bookManager.saveBook(book);

$.addressbook.bookManager.saveAddress({
        id         : Math.floor(Math.random() * 1000000),
        book       : { id: bookId },
        first_name : 'Tiven',
        last_name  : 'Wang',
        address    : 'Pudong, Chenhui road, 1001',
        city       : 'Shanghai',
        country    : 'China',
        zip        : '20001',
        phone      : '+86 21 6108 7986',
        email      : 'tiwen.wang@sap.com',
        web        : 'http://tiven.wang'
});

$.addressbook.bookManager.saveAddress({
        id         : Math.floor(Math.random() * 1000000),
        book       : { id: bookId },
        first_name : 'Max',
        last_name  : 'Mustermann',
        address    : 'Dietmar-Hopp-Allee 16',
        city       : 'Walldorf',
        country    : 'Germany',
        zip        : '69169',
        phone      : '+49 6227 7 54321',
        email      : 'john.doe@sap.com',
        web        : 'https://sap.de'
});

$.response.setBody(JSON.stringify(book));
