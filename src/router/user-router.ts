

import express from 'express';
import { authMiddleware } from '../middleware/aut.middleware';
import { GetUser } from './service/user-service';


/**
 * User router will handle all requests with /users
 */
export const userRouter = express.Router();


/**
 * find specific user
 * endpoint: /users/:id
 */
userRouter.get(`/:id`,
    [authMiddleware(['admin']),
    async (req, res) => {
        const id: number = req.params.id;
        console.log(`retreiving user with id: ${req.params.id}`);
        const user = await GetUser(id);
        console.log(user);
        res.send(user);
    }
    ]
);

/**
 * find specific user
 * endpoint: /users/username/:username
 */
userRouter.get(`/username/:username`, (req, res) => {
    console.log(`retreiving user with username: ${req.params.username}`);
    res.send(`here is the user with username: ${req.params.username}`);
});

// /**
//  * update user
//  * endpoint: /users
//  */
// userRouter.patch(``, (req, res) => {
//     console.log(`recieved \'users\' endpoint patch request`);
//     const id: number = req.body.userId;
//     console.log(`retreiving user with id: ${req.params.id}`);
//     const user = users.find(u => u.userId === id);
//     if (!user) {
//         res.sendStatus(404);
//     }
//     else {
//         for (const field in user) {
//             if (req.body[field] !== undefined) {
//                 user[field] = req.body[field];
//             }
//         }
//         res.send(`updated user: ${id}`);
//     }
// });


// userRouter.post(`/login`, (req, res) => {
//     console.log(`login request made`);
//     const { username, password } = req.body;
//     const user = users.find(u => u.username === username && u.password === password);

//     if (user) {
//         req.session.user = user;
//         res.end();
//     }
//     else {
//         res.sendStatus(401);
//     }
// });