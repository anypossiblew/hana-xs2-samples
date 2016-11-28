function saveBook(book) {
  var conn = $.hdb.getConnection();

  var sql = 'INSERT INTO "com.sap.xs2.tiven::AddressBook.Book" VALUES(?, ?)';
  var rs = conn.executeUpdate(sql, book.id, book.name);

  conn.commit();
}

function findAllBooks() {
  var conn = $.hdb.getConnection();

  var sql = 'SELECT * FROM "com.sap.xs2.tiven::AddressBook.Book"';
  var books = conn.executeQuery(sql);

  return books;
}

function saveAddress(address) {
  var conn = $.hdb.getConnection();
  var sql = 'INSERT INTO "com.sap.xs2.tiven::AddressBook.Address" VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  var rs = conn.executeUpdate(sql,
                              address.id,
                              address.book.id,
                              address.first_name,
                              address.last_name,
                              address.address,
                              address.city,
                              address.country,
                              address.zip,
                              address.phone,
                              address.email,
                              address.web
                            );

  conn.commit();
}

function findAllAddresses() {
  var conn = $.hdb.getConnection();

  var sql = 'SELECT "id", "book.id" as "book_id", "first_name", "last_name", "phone", "city", "country" FROM "com.sap.xs2.tiven::AddressBook.Address"';
  var addresses = conn.executeQuery(sql);

  return addresses;
}
