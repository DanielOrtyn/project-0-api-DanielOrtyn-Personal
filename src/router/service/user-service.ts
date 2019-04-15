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
        let queryString = `UPDATE ${USER_TABLE_NAME} SET`;
        let fieldCount: number = 0;
        const fieldParams: any[] = [];
        if (userUpdate.username) {
            fieldCount++;
            queryString = `${queryString} username = $${fieldCount}`;
            fieldParams.push(userUpdate.username);
        }
        if (userUpdate.password) {
            fieldCount++;
            queryString = `${queryString}, password = $${fieldCount}`;
            fieldParams.push(userUpdate.password);
        }
        if (userUpdate.firstname) {
            fieldCount++;
            queryString = `${queryString}, firstname = $${fieldCount}`;
            fieldParams.push(userUpdate.firstname);
        }
        if (userUpdate.lastname) {
            fieldCount++;
            queryString = `${queryString}, lastname = $${fieldCount}`;
            fieldParams.push(userUpdate.lastname);
        }
        if (userUpdate.email) {
            fieldCount++;
            queryString = `${queryString}, email = $${fieldCount}`;
            fieldParams.push(userUpdate.email);
        }
        if (userUpdate.roleid) {
            fieldCount++;
            queryString = `${queryString}, roleid = $${fieldCount}`;
            fieldParams.push(userUpdate.roleid);
        }
        fieldCount++;
        queryString = `${queryString} WHERE userid = $${fieldCount}`;
        fieldParams.push(userUpdate.userid);

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