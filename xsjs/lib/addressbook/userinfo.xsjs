$.import("addressbook", "userinfoManager");

$.response.contentType = "application/json";
var userinfo = $.addressbook.userinfoManager.readUserinfo($.session.xssecSecurityContext.userInfo);
$.response.setBody(JSON.stringify(userinfo));
