
export function authMiddleware(roles: string[]) {
    return (req, res, next) => {
        console.log('Auth Done');
        console.log(req.session);
        // console.log(req.session.user);
        const isAuthorized = req.session.user && roles.includes(req.session.user.role.role);
        if (isAuthorized) {
            next();
            console.log(`Authorized`);
        }
        else {
            console.log(`Invalid Auth`);
            sendInvalidAuthMessage(res);
        }
    };
}

export function matchUserIdAuthauthMiddleware(session: Express.Session, roles: string[], userId) {
    console.log(userId);
    console.log(session.user.userId);
    const currentRole = session.user && session.user.role && session.user.role.role;
    const isAuthorized = currentRole && roles.includes(currentRole);
    const currentUserId = session.user && session.user.userId;
    return isAuthorized || (Number(currentUserId) === Number(userId));
}

export function sendInvalidAuthMessage(res): void {
    res.status(401).json({ message: 'The incoming token has expired' });
}