import {Request, Response} from "express";
import {Transaction, TRANSACTIONSTATUS, TRANSACTIONTYPE} from "../models/transaction";
import {NotFoundError} from "@jhaki/common";

export class TransactionController {
    static async getTransaction(req: Request, res: Response) {
        const userId = req.currentUser!.id;

        const transactions = await Transaction.find({userId: userId});
        if (!transactions) {
            throw new NotFoundError();
        }

        res.send(transactions);
    }

    static async credit(req: Request, res: Response) {
        const userId = req.currentUser!.id;
        const {amount} = req.body;

        const transaction = Transaction.build({
            userId,
            amount,
            type: TRANSACTIONTYPE.CREDIT,
            status: TRANSACTIONSTATUS.APPROVED
        })
        await transaction.save();

        res.status(201).send(transaction);
    }

    static async debit(req: Request, res: Response) {
        const userId = req.currentUser!.id;
        const {amount} = req.body;

        const transaction = Transaction.build({
            userId,
            amount,
            type: TRANSACTIONTYPE.DEBIT,
            status: TRANSACTIONSTATUS.APPROVED
        })
        await transaction.save();

        res.status(201).send(transaction);
    }
}