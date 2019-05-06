

import express from 'express';
import { authMiddleware, matchUserIdAuthauthMiddleware, sendInvalidAuthMessage } from '../../middleware/aut.middleware';
import { Reimbursement } from '../../model/Server/Reimbursement';
import { convertSqlReimbursement, convertSqlReimbursementStatus, convertSqlReimbursementType } from '../../model/DataTransferObject/Reimbursement.dto';
import { GetAuthorReimbursements, GetStatusReimbursements, CreateReimbursement, UpdateReimbursement, GetReimbursement } from '../service/reimbursements-service';

/**
 * User router will handle all requests with /users
 */
export const reimbursementRouter = express.Router();

reimbursementRouter.get(`/status/:statusId`,
    [authMiddleware(['admin', 'finance-manager']),
    async (req, res) => {
        const statusId: number = req.params.statusId;
        const response = await GetStatusReimbursements(statusId);
        const reimbursementList: Reimbursement[] = [];
        if (response && response.rows) {
            parseReimbursementRows(reimbursementList, response.rows);
            res.json(reimbursementList);
        }
        else {
            res.sendStatus(400);
        }
    }
    ]
);

reimbursementRouter.get(`/author/userId/:userId`,
    async (req, res) => {
        const id: number = req.params.userId;
        console.log(id);
        if (matchUserIdAuthauthMiddleware(req.session, ['finance-manager'], id)) {
            const userId: number = req.params.userId;
            // if (matchUserIdAuthauthMiddleware(req.session, ['finance-manager'], userId)) {
            const response = await GetAuthorReimbursements(userId);
            const reimbursementList: Reimbursement[] = [];
            if (response && response.rows) {
                parseReimbursementRows(reimbursementList, response.rows);
                res.json(reimbursementList);
            }
            else {
                res.sendStatus(400);
            }
        }
        else {
            sendInvalidAuthMessage(res);
        }
    }
);

reimbursementRouter.post(``,
    async (req, res) => {
        const creationResponse = await CreateReimbursement(req.session.user.userId, req.body);

        if (creationResponse && creationResponse.rows.length === 1) {
            const insertedReimbursement = convertSqlReimbursement(creationResponse.rows[0]);
            res.status(201).json(insertedReimbursement);
        }
        else {
            res.status(400).json({ message: 'Creation failed' });
        }
    }
);

reimbursementRouter.patch(``,
    [authMiddleware(['finance-manager']),
    async (req, res) => {
        const reimbursement = await GetReimbursement(req.body.reimbursementid);
        if (reimbursement && reimbursement.rows.length === 1) {
            const reimbursementObj = convertSqlReimbursement(reimbursement.rows[0]);
            // if reimbursement is cancled or resolved don't allow a change
            if (reimbursementObj.status === 4) {
                res.status(403).json({ message: 'Reimbursement is resolved. Update failed' });
            }
            if (reimbursementObj.status === 5) {
                res.status(403).json({ message: 'Reimbursement is canceled. Update failed' });
            }
        } else {
            res.status(404).json({ message: 'Reimbursement of does not exist' });
        }

        console.log(req.body);
        const updateResponse = await UpdateReimbursement(req.body);

        if (updateResponse && updateResponse.rows.length === 1) {
            const insertedReimbursement = convertSqlReimbursement(updateResponse.rows[0]);
            console.log(insertedReimbursement);
            res.status(201).json(insertedReimbursement);
        }
        else {
            res.status(400).json({ message: 'Update failed' });
        }
    }
    ]
);


function parseReimbursementRows(reimbursementList: Reimbursement[], rows): void {
    for (const reimbursementRow of rows) {
        const reimbursement = convertSqlReimbursement(reimbursementRow);
        reimbursement.status = convertSqlReimbursementStatus(reimbursementRow);
        reimbursement.type = convertSqlReimbursementType(reimbursementRow);
        reimbursementList.push(reimbursement);

    }
}


