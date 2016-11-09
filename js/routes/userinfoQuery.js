function userInfoQuery(externalUserInfo, dbConnection, callback) {
    responseObject = {};
    dbConnection.exec("SELECT TOP 1 CURRENT_USER, SESSION_USER, SESSION_CONTEXT('XS_APPLICATIONUSER') as APPLICATION_USER FROM DUMMY", function (error, rows) {
        if (error) {
            callback(error, null);
        }
        else {
            responseObject.hdbCurrentUser = rows;
            responseObject.user = externalUserInfo;
            callback(null, responseObject);
        }
    });
}
module.exports = userInfoQuery;
