"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authMiddleware(roles) {
    return function (req, res, next) {
        var isAuthorized = req.session.user && roles.includes(req.session.user.role.role);
        if (isAuthorized) {
            next();
        }
        else {
            res.sendStatus(403);
        }
    };
}
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=aut.middleware.js.map