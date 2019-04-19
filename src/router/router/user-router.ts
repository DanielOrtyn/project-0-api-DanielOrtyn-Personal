

import express from 'express';
import { authMiddleware, matchUserIdAuthauthMiddleware, sendInvalidAuthMessage } from '../../middleware/aut.middleware';
import { GetUser, GetAllUser, UpdateUser } from '.././service/user-service';
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
        const userRows = await GetAllUser();
        const userList: User[] = [];
        for (const userRow of userRows) {
            userList.push(convertSqlUser(userRow));
            userList[userList.length - 1].role = convertSqlRole(userRow);
        }
        console.log(`User list sent`);
        res.json(userList);
    }
    ]
);

/**
 * find specific user
 * endpoint: /users/:id
 */
userRouter.get(`/:id`, async (req, res) => {
    const id: number = req.params.id;
    if (matchUserIdAuthauthMiddleware(req.session, ['finance-manager'], id)) {
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
