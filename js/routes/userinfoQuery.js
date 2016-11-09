var hdbext = require('sap-hdbext');

var hanaConfig = {
  host: '<hana db host>',
  port: 30015,
  user: '<hana db user name>',
  password: '<hana db user password>',
  schema: '<hdi shema>',
  isolationLevel: hdbext.constants.isolation.SERIALIZABLE,
  locale: 'en_US',
  session: {
    APPLICATION: 'xs2-node-hw-db'
  }
};

function userInfoQuery(externalUserInfo, callback) {
    responseObject = {};

    hdbext.createConnection(hanaConfig, function(error, client) {
      if (error) {
        return console.error(error);
      }

      client.exec("SELECT TOP 1 CURRENT_USER, SESSION_USER, SESSION_CONTEXT('XS_APPLICATIONUSER') as APPLICATION_USER FROM DUMMY", function (error, rows) {
          if (error) {
              callback(error, null);
          }
          else {
              responseObject.hdbCurrentUser = rows;
              responseObject.user = externalUserInfo;
              callback(null, responseObject);
          }
      });
    });
}
module.exports = userInfoQuery;
