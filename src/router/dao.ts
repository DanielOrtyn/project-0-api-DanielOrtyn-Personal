import { connectionPool } from '../connection/connection';
import { PoolClient } from 'pg';

export async function findAllSpaceshipBetter() {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const result = await client.query('SELECT * FROM spaceship.spaceship LIMIT 1');
        console.log(result.rows);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
}