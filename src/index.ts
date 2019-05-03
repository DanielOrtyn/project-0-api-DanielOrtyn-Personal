import express from 'express';
import bodyParser from 'body-parser';
import { sessionMiddleware } from './middleware/session.middleware';
import { userRouter } from './router/router/user-router';
import { reimbursementRouter } from './router/router/reimbursements-router';
import { universalRouter } from './router/router/universal-router';

const app = express();


// allow cross origins
app.use((req, resp, next) => {
    console.log(req.get('host'));
    (process.env.SHIP_API_STAGE === 'prod')
        ? resp.header('Access-Control-Allow-Origin', process.env.SHIP_APP_URL)
        : resp.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH');
    next();
});

app.use((req, res, next) => {
    console.log(`req processed with url: ${req.url} and method: ${req.method}.`);
    next();
});

app.use(bodyParser.json());
app.use(sessionMiddleware);

app.get(`/test`, async (req, res) => {
    // console.log('req processed.');
    // const userRows = await GetAllUser();
    // const userList: User[] = [];
    // for (const userRow of userRows) {
    //     userList.push(convertSqlUser(userRow));
    //     userList[userList.length - 1].role = convertSqlRole(userRow);
    // }
    // console.log(`User list sent`);
    // res.send('Spcialist of special, but not that special');//.json(userList);
    res.status(200).send('Reached Test Endpoint');
});

/**
 * Register Routers
 */
app.use(`/users`, userRouter);
app.use(`/reimbursements`, reimbursementRouter);
app.use(`/universal`, universalRouter);
const portNumber = Number.parseInt(process.env['REVATURE_LISTEN_PORT']);
app.listen(portNumber);
console.log(`Server Started. Listening on Port: ${portNumber}`);
