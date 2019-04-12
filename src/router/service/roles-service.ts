import { connectionPool, SCHEMA_NAME } from '../../connection/connection';
import { PoolClient } from 'pg';

const ROLES_TABLE_NAME = `${SCHEMA_NAME}.users`;

export async function GetRoleList() {
    let client: PoolClient;
    let result = undefined;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM  ${ROLES_TABLE_NAME}`;
        result = await client.query(queryString);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return result.rows;
}