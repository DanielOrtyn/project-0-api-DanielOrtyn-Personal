"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("../Server/Role");
function convertSqlRole(sqlRole) {
    return new Role_1.Role(sqlRole.roleid, sqlRole.role);
}
exports.convertSqlRole = convertSqlRole;
//# sourceMappingURL=Role.dto.js.map