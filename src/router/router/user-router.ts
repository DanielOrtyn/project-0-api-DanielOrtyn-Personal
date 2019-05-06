

import express from 'express';
import { authMiddleware, matchUserIdAuthauthMiddleware, sendInvalidAuthMessage } from '../../middleware/aut.middleware';
import { GetUser, GetAllUser, UpdateUser, ValidateLogin } from '.././service/user-service';
import { User } from '../../model/Server/User';
import { convertSqlUser } from '../../model/DataTransferObject/User.dto';
import { convertSqlRole } from '../../model/DataTransferObject/Role.dto';


/**
 * User router will handle all requests with /users
 */
export const userRouter = express.Router();


userRouter.get(``,
    [authMiddleware(['finance-manager']),
    async (req, res) => {
        console.log(`Getting Users`);
        const userRows = await GetAllUser();
        const userList: User[] = [];
        for (const userRow of userRows) {
            userList.push(convertSqlUser(userRow));
            userList[userList.length - 1].role = convertSqlRole(userRow);
        }
        console.log(`User list sent`);
        res.status(200).json(userList);
    }
    ]
);

/**
 * find specific user
 * endpoint: /users/:id
 */
userRouter.get(`/:id`, async (req, res) => {
    const id: number = req.params.id;
    if (matchUserIdAuthauthMiddleware(req.session, ['finance-manager', 'admin'], id)) {
        const userRows = await GetUser(id);
        if (userRows && userRows.length === 1) {
            const retrievedUser = convertSqlUser(userRows[0]);
            retrievedUser.role = convertSqlRole(userRows[0]);
            res.status(200).json(retrievedUser);
        }
        else {
            res.status(404).json({ message: 'User not found' });
        }
    }
    else {
        sendInvalidAuthMessage(res);
    }
});

userRouter.patch(``,
    [authMiddleware(['admin']),
    async (req, res) => {
        const updateResponse = await UpdateUser(req.body);

        if (updateResponse && updateResponse.rows.length === 1) {
            const updateduser = convertSqlUser(updateResponse.rows[0]);
            updateduser.role = convertSqlRole(updateResponse.rows[0]);
            console.log(updateduser);
            res.status(200).json(updateduser);
        }
        else {
            res.status(400).json({ message: 'Update failed' });
        }
    }
    ]
);

userRouter.post(`/login`, async (req, res) => {
    console.log(`login request made`);
    const { username, password } = req.body;
    const serverRes = await ValidateLogin(username, password);

    if (serverRes && serverRes.length === 1) {
        req.session.user = convertSqlUser(serverRes[0]);
        req.session.user.role = convertSqlRole(serverRes[0]);
        console.log(req.session.user);
        res.status(200).json(req.session.user); // .send(`Login Succeeded`);
    }
    else {
        console.log(`login failed`);
        res.status(400).json({ message: 'Invalid Credentials' });
    }
});


userRouter.post(`/logout`, (req, res) => {
    console.log(`logout request made`);
    req.session.user = undefined;
    console.log(`Current User: ${req.session.user}`);
    res.sendStatus(200);
});
