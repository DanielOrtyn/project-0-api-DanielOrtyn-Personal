"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("../../state");
var User_1 = require("../Server/User");
function convertSqlUser(sqlUser) {
    var roleList = state_1.roles.filter(function (role) { return role.roleId = sqlUser.roleid; });
    var userRole = roleList[0];
    return new User_1.User(sqlUser.userid, sqlUser.username, sqlUser.password, sqlUser.firstname, sqlUser.lastname, sqlUser.email, userRole);
}
exports.convertSqlUser = convertSqlUser;
//# sourceMappingURL=User.dto.js.map