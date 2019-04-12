import { connectionPool, SCHEMA_NAME } from '../../connection/connection';
import { PoolClient } from 'pg';

const USER_TABLE_NAME = `${SCHEMA_NAME}.users`;

export async function ValidateLogin(username: string, password: string) {
    let client: PoolClient;
    let result = undefined;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM  ${USER_TABLE_NAME} WHERE username = $1 AND password = $2 LIMIT 1`;
        result = await client.query(queryString, [username, password]);
    } catch (err) {
        console.log(err);
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
        const queryString = `SELECT * FROM  ${USER_TABLE_NAME} WHERE userid = $1`;
        result = await client.query(queryString, [userid]);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return result.rows;
}