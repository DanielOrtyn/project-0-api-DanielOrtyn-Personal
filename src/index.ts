import express from 'express';
import bodyParser from 'body-parser';
import { sessionMiddleware } from './middleware/session.middleware';
import { convertSqlUser } from './model/DataTransferObject/User.dto';
import { ValidateLogin, GetAllUser } from './router/service/user-service';
import { userRouter } from './router/router/user-router';
import { convertSqlRole } from './model/DataTransferObject/Role.dto';
import { reimbursementRouter } from './router/router/reimbursements-router';
import { User } from './model/Server/User';

const app = express();

app.use((req, res, next) => {
    console.log(`req processed with url: ${req.url} and method: ${req.method}.`);
    next();
});

app.use(bodyParser.json());
app.use(sessionMiddleware);

app.get(`/test`, async (req, res) => {
    console.log('req processed.');
    const userRows = await GetAllUser();
    const userList: User[] = [];
    for (const userRow of userRows) {
        userList.push(convertSqlUser(userRow));
        userList[userList.length - 1].role = convertSqlRole(userRow);
    }
    console.log(`User list sent`);
    res.send('Spcialist of special, but not that special');//.json(userList);
});

app.post(`/login`, async (req, res) => {
    console.log(`login request made`);
    const { username, password } = req.body;
    const serverRes = await ValidateLogin(username, password);

    if (serverRes && serverRes.length === 1) {
        req.session.user = convertSqlUser(serverRes[0]);
        req.session.user.role = convertSqlRole(serverRes[0]);
        console.log(req.session.user);
        res.status(200).send(`Login Succeeded`);
    }
    else {
        res.status(400).json({ message: 'Invalid Credentials' });
    }
});

app.post(`/logout`, (req, res) => {
    console.log(`logout request made`);
    req.session.user = undefined;
    console.log(`Current User: ${req.session.user}`);
    res.sendStatus(200);
});

/**
 * Register Routers
 */
app.use(`/users`, userRouter);
app.use(`/reimbursements`, reimbursementRouter);
const portNumber = Number.parseInt(process.env['REVATURE_LISTEN_PORT']);
app.listen(portNumber);
console.log(`Server Started. Listening on Port: ${portNumber}`);
