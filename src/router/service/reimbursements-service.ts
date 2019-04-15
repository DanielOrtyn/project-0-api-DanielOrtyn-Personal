import { connectionPool, SCHEMA_NAME } from '../../connection/connection';
import { PoolClient } from 'pg';

const REIMBURSEMENT_TABLE_NAME = `${SCHEMA_NAME}.reimbursements`;

export async function GetAuthorReimbursements(authorId: number) {
    let client: PoolClient;
    let result = undefined;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM ${REIMBURSEMENT_TABLE_NAME} WHERE author = $1;`;
        result = await client.query(queryString, [authorId]);
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
    return result;
}
