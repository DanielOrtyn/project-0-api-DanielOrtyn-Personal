import { connectionPool, SCHEMA_NAME } from '../../connection/connection';
import { PoolClient } from 'pg';
import { ISqlReimbursement } from '../../model/Database/ISqlReimbursement.dbo';

const REIMBURSEMENT_TABLE_NAME = `${SCHEMA_NAME}.reimbursement`;

export async function GetStatusReimbursements(statusId: number) {
    let client: PoolClient;
    let result = undefined;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM ${REIMBURSEMENT_TABLE_NAME} WHERE status = $1;`;
        result = await client.query(queryString, [statusId]);
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
    return result;
}

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

export async function CreateReimbursement(userId: number, reimbursement: ISqlReimbursement) {
    let client: PoolClient;
    let selectResult = undefined;
    try {
        client = await connectionPool.connect();

        let queryString = `INSERT INTO ${REIMBURSEMENT_TABLE_NAME}` +
            ` (author, amount, dateSubmitted, description, status, type) VALUES` +
            ` (${userId}`;
        const fieldParams: any[] = [];

        fieldParams.push(reimbursement.amount);
        queryString = `${queryString}, $${fieldParams.length}`;

        fieldParams.push(reimbursement.datesubmitted);
        queryString = `${queryString}, $${fieldParams.length}`;

        fieldParams.push(reimbursement.description);
        queryString = `${queryString}, $${fieldParams.length}`;

        queryString = `${queryString}, 2`;

        fieldParams.push(reimbursement.type);
        queryString = `${queryString}, $${fieldParams.length}`;

        queryString = `${queryString}) RETURNING reimbursementid;`;

        const insertResponse = await client.query(queryString, fieldParams);
        const reimbursementId: number = insertResponse.rows[0]['reimbursementid'];
        const selectStatement = `SELECT * FROM ${REIMBURSEMENT_TABLE_NAME} WHERE reimbursementid = ${reimbursementId}`;
        selectResult = await client.query(selectStatement);
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
    return selectResult;
}


export async function UpdateReimbursement(reimbursement: ISqlReimbursement) {
    let client: PoolClient;
    let selectResult = undefined;
    try {
        client = await connectionPool.connect();

        let querySetters = ``;
        const fieldParams: any[] = [];
        if (reimbursement.author) {
            fieldParams.push(reimbursement.author);
            querySetters = `${querySetters}, author = $${fieldParams.length}`;
        }
        if (reimbursement.amount) {
            fieldParams.push(reimbursement.amount);
            querySetters = `${querySetters}, amount = $${fieldParams.length}`;
        }
        if (reimbursement.datesubmitted) {
            fieldParams.push(reimbursement.datesubmitted);
            querySetters = `${querySetters}, datesubmitted = $${fieldParams.length}`;
        }
        if (reimbursement.dateresolved) {
            fieldParams.push(reimbursement.dateresolved);
            querySetters = `${querySetters}, dateresolved = $${fieldParams.length}`;
        }
        if (reimbursement.description) {
            fieldParams.push(reimbursement.description);
            querySetters = `${querySetters}, description = $${fieldParams.length}`;
        }
        if (reimbursement.resolver) {
            fieldParams.push(reimbursement.resolver);
            querySetters = `${querySetters}, resolver = $${fieldParams.length}`;
        }
        if (reimbursement.status) {
            fieldParams.push(reimbursement.status);
            querySetters = `${querySetters}, status = $${fieldParams.length}`;
        }
        if (reimbursement.type) {
            fieldParams.push(reimbursement.type);
            querySetters = `${querySetters}, type = $${fieldParams.length}`;
        }
        // check that there are fields to update
        if (querySetters.length !== 0) {
            // querySetter string substringed to remove leading comma and space
            const queryString = `UPDATE ${REIMBURSEMENT_TABLE_NAME} SET` +
                ` ${querySetters.substring(2)} WHERE reimbursementid = ${reimbursement.reimbursementid};`;

            console.log(queryString);
            const responseUpdate = await client.query(queryString, fieldParams);
            console.log(responseUpdate);
            const selectStatement = `SELECT * FROM ${REIMBURSEMENT_TABLE_NAME} WHERE reimbursementid = ${reimbursement.reimbursementid}`;

            console.log(selectStatement);
            selectResult = await client.query(selectStatement);
            console.log(selectResult);
        }
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
    return selectResult;
}

