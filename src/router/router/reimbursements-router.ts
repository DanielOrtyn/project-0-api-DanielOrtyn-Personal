

import express from 'express';
import { customAuthauthMiddleware } from '../../middleware/aut.middleware';
import { Reimbursement } from '../../model/Server/Reimbursement';
import { convertSqlReimbursement } from '../../model/DataTransferObject/Reimbursement.dto';
import { GetAuthorReimbursements } from '../service/reimbursements-service';


/**
 * User router will handle all requests with /users
 */
export const userRouter = express.Router();


userRouter.get(`/reimbursements/author/userId/:userId`,
    async (req, res) => {
        const userId: number = req.params.userId;
        if (customAuthauthMiddleware(req.session.user.role.role, ['admin', 'finance-manager'],
            req.session.user.userId, userId)) {
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
