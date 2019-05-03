
import express from 'express';
import { GetAllUser } from '.././service/user-service';
import { ISqlUser } from '../../model/Database/ISqlUser.dbo';
import { GetReimbursementStatusList, GetReimbursementTypeList } from '../service/reimbursements-service';
import { ReimbursementStatus } from '../../model/Server/ReimbursementStatus';
import { convertSqlReimbursementStatus, convertSqlReimbursementType } from '../../model/DataTransferObject/Reimbursement.dto';
import { ReimbursementType } from '../../model/Server/ReimbursementType';


/**
 * User router will handle all requests with /users
 */
export const universalRouter = express.Router();


universalRouter.get(`/simpleUserList`,
    async (req, res) => {
        console.log(`Getting Simple User List`);
        const userRows = await GetAllUser();
        console.log(userRows);
        const userList = [userRows.length];
        for (const userRow of userRows) {
            const userSql: ISqlUser = userRow as ISqlUser;
            userList.push({
                userId: userSql.userid,
                username: userSql.username
            });
        }
        console.log(userRows);
        console.log(`User list sent`);
        res.status(200).json(userList);
    }
);


universalRouter.get(`/statusList`,
    async (req, res) => {
        const response = await GetReimbursementStatusList();
        const reimbursementStatusList: ReimbursementStatus[] = [];
        if (response && response.rows) {
            for (const reimbursementStatusRow of response.rows) {
                reimbursementStatusList.push(convertSqlReimbursementStatus(reimbursementStatusRow));
            }
            res.json(reimbursementStatusList);
        }
        else {
            res.sendStatus(400);
        }
    }
);

universalRouter.get(`/typeList`,
    async (req, res) => {
        const response = await GetReimbursementTypeList();
        const reimbursementTypeList: ReimbursementType[] = [];
        if (response && response.rows) {
            for (const reimbursementTypeRow of response.rows) {
                reimbursementTypeList.push(convertSqlReimbursementType(reimbursementTypeRow));
            }
            res.json(reimbursementTypeList);
        }
        else {
            res.sendStatus(400);
        }
    }
);


