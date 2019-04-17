
export function authMiddleware(roles: string[]) {
    return (req, res, next) => {
        const isAuthorized = req.session.user && roles.includes(req.session.user.role.role);
        if (isAuthorized) {
            next();
        }
        else {
            sendInvalidAuthMessage(res);
        }
    };
}

export function matchUserIdAuthauthMiddleware(session: Express.Session, roles: string[], userId) {
    const currentRole = session.user && session.user.role && session.user.role.role;
    const isAuthorized = currentRole && roles.includes(currentRole);
    const currentUserId = session.user && session.user.userId;
    return isAuthorized || (Number(currentUserId) === Number(userId));
}

export function sendInvalidAuthMessage(res): void {
    res.status(401).json({ message: 'The incoming token has expired' });
}