

import express from 'express';
import { authMiddleware, matchUserIdAuthauthMiddleware } from '../../middleware/aut.middleware';
import { Reimbursement } from '../../model/Server/Reimbursement';
import { convertSqlReimbursement } from '../../model/DataTransferObject/Reimbursement.dto';
import { GetAuthorReimbursements, GetStatusReimbursements, CreateReimbursement, UpdateReimbursement } from '../service/reimbursements-service';


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
            for (const reimbursementRow of response.rows) {
                reimbursementList.push(convertSqlReimbursement(reimbursementRow));
            }
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
        const userId: number = req.params.userId;
        if (matchUserIdAuthauthMiddleware(req.session, ['finance-manager'], userId)) {
            const response = await GetAuthorReimbursements(userId);
            const reimbursementList: Reimbursement[] = [];
            if (response && response.rows) {
                for (const reimbursementRow of response.rows) {
                    reimbursementList.push(convertSqlReimbursement(reimbursementRow));
                }
                res.json(reimbursementList);
            }
            else {
                res.sendStatus(400);
            }
        } else {
            res.sendStatus(401);
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
[authMiddleware(['admin', 'finance-manager']),
    async (req, res) => {
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


