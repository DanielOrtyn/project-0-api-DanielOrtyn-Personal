
export function authMiddleware(roles: string[]) {
    return (req, res, next) => {
        const isAuthorized = req.session.user && roles.includes(req.session.user.role.role);
        if (isAuthorized) {
            next();
        }
        else {
            res.sendStatus(401);
        }
    };
}

export function customAuthauthMiddleware(currentRole: string, roles: string[], check: any, toCheck: any) {
    const isAuthorized = currentRole && roles.includes(currentRole);
    return isAuthorized || check === toCheck;
}