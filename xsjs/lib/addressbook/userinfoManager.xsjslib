function readUserinfo(externalUserinfo) {
  var conn = $.hdb.getConnection();

  var sql = 'SELECT TOP 1 CURRENT_USER, SESSION_USER, SESSION_CONTEXT(\'XS_APPLICATIONUSER\') as APPLICATION_USER FROM "com.sap.xs2.tiven::AddressBook.Book"';
  var rs = conn.executeQuery(sql);

  var userinfo = {};

  userinfo.user = externalUserinfo || {};
  userinfo.user.name = {};
  userinfo.user.name.logonName = externalUserinfo.logonName;
  userinfo.user.name.lastName = externalUserinfo.lastName;
  if('firstName' in externalUserinfo) {
    userinfo.user.name.firstName = externalUserinfo.firstName;
  }
  userinfo.hdbCurrentUser = rs;
  return userinfo;
}
