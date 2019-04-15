"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var roles_service_1 = require("./router/service/roles-service");
var Role_dto_1 = require("./model/DataTransferObject/Role.dto");
exports.roles = [];
roles_service_1.GetRoleList().then(function whenOk(response) {
    for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
        var row = response_1[_i];
        exports.roles.push(Role_dto_1.convertSqlRole(row));
    }
});
//# sourceMappingURL=state.js.map