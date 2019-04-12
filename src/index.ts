import express from 'express';
import bodyParser from 'body-parser';
import { sessionMiddleware } from './middleware/session.middleware';
import { userRouter } from './router/user-router';
import { convertSqlUser } from './model/DataTransferObject/User.dto';
import { ValidateLogin } from './router/service/user-service';

const app = express();

app.use((req, res, next) => {
    console.log(`req processed with url: ${req.url} and method: ${req.method}.`);
    next();
});

app.use(bodyParser.json());
app.use(sessionMiddleware);

app.get(`/test`, (req, res) => {
    console.log('req processed.');
    res.send(`Here is the response data`);
});

app.post(`/login`, async (req, res) => {
    console.log(`login request made`);
    const { username, password } = req.body;
    const serverRes = await ValidateLogin(username, password);

    if (serverRes) {
        req.session.user = convertSqlUser(serverRes[0]);
        console.log(req.session.user);
        res.end();
    }
    else {
        res.sendStatus(401);
    }
});

app.post(`/logout`, (req, res) => {
    console.log(`logout request made`);
    req.session.user = undefined;
    console.log(req.session.user);
    res.sendStatus(200);
});

/**
 * Register Routers
 */
app.use(`/user`, userRouter);
app.listen(8080);
console.log(`Server Started`);
