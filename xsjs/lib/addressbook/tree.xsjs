$.import("addressbook", "bookManager");

$.response.contentType = "application/json";

var data = { books : { name : 'root' } };

var books = $.addressbook.bookManager.findAllBooks();
for(var i=0; i < books.length; i++) {
  data.books[books[i].id] = { name: books[i].name }
}

var addresses = $.addressbook.bookManager.findAllAddresses();
for(var i=0; i < addresses.length; i++) {
  var address = addresses[i];
  data.books[address.book_id][address.id] = {
    name: address.first_name + ' ' + address.last_name,
    phone: address.phone,
    city: address.city,
    country: address.country
  }
}

$.response.setBody(JSON.stringify(data));
