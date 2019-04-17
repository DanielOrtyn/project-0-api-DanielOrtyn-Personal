import { connectionPool, SCHEMA_NAME } from '../../connection/connection';
import { PoolClient } from 'pg';
import { ISqlUser } from '../../model/Database/ISqlUser.dbo';

const USER_TABLE_NAME = `${SCHEMA_NAME}.users`;
const ROLE_TABLE_NAME = `${SCHEMA_NAME}.role`;

export async function ValidateLogin(username: string, password: string) {
    let client: PoolClient;
    let result = undefined;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM ${USER_TABLE_NAME} INNER JOIN ${ROLE_TABLE_NAME}` +
            ` ON users.roleid = role.roleid WHERE username = $1 AND password = $2 LIMIT 1;`;
        result = await client.query(queryString, [username, password]);
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
    return result.rows;
}

export async function GetAllUser(userid: number) {
    let client: PoolClient;
    let result = undefined;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM ${USER_TABLE_NAME} INNER JOIN ${ROLE_TABLE_NAME}` +
            ` ON users.roleid = role.roleid;`;
        result = await client.query(queryString);
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
    return result.rows;
}

export async function GetUser(userid: number) {
    let client: PoolClient;
    let result = undefined;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM ${USER_TABLE_NAME} INNER JOIN ${ROLE_TABLE_NAME}` +
            ` ON users.roleid = role.roleid WHERE userid = $1;`;
        result = await client.query(queryString, [userid]);
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
    return result.rows;
}

export async function UpdateUser(userUpdate: ISqlUser) {
    let client: PoolClient;
    let selectResult = undefined;
    try {
        client = await connectionPool.connect();

        console.log('querybuilding starting');
        const fieldParams: any[] = [];
        let querySetters = ``;
        if (userUpdate.username) {
            fieldParams.push(userUpdate.username);
            querySetters = `${querySetters}, username = $${fieldParams.length}`;
        }
        if (userUpdate.password) {
            fieldParams.push(userUpdate.password);
            querySetters = `${querySetters}, password = $${fieldParams.length}`;
        }
        if (userUpdate.firstname) {
            fieldParams.push(userUpdate.firstname);
            querySetters = `${querySetters}, firstname = $${fieldParams.length}`;
        }
        if (userUpdate.lastname) {
            fieldParams.push(userUpdate.lastname);
            querySetters = `${querySetters}, lastname = $${fieldParams.length}`;
        }
        if (userUpdate.email) {
            fieldParams.push(userUpdate.email);
            querySetters = `${querySetters}, email = $${fieldParams.length}`;
        }
        if (userUpdate.roleid) {
            fieldParams.push(userUpdate.roleid);
            querySetters = `${querySetters}, roleid = $${fieldParams.length}`;
        }
        if (querySetters.length === 0) {
            return undefined;
        }

        fieldParams.push(userUpdate.userid);
        const queryString = `UPDATE ${USER_TABLE_NAME} SET` +
            `${querySetters.substring(1)} WHERE userid = $${fieldParams.length}`;

        console.log(`Query: ${queryString}`);
        await client.query(queryString, fieldParams);

        const selectStatement = `SELECT * FROM ${USER_TABLE_NAME} INNER JOIN ${ROLE_TABLE_NAME}` +
            ` ON ${USER_TABLE_NAME}.roleid = ${ROLE_TABLE_NAME}.roleid WHERE userid = $1;`;
        selectResult = await client.query(selectStatement, [userUpdate.userid]);
        console.log(`Query Run`);
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
    return selectResult;
}