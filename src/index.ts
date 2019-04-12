import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './controller/user-controller';
import { sessionMiddleware } from './middleware/session.middleware';
import { ValidateLogin } from './controller/user-service';
import { User } from './model/user';

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
        req.session.user = <User>(serverRes[0]);
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
app.use(`/users`, userRouter);
app.listen(8080);
console.log(`Server Started`);
