import express from 'express';
import {body} from "express-validator";
import {currentUser, requireAuth} from "@jhaki/common";
import {TransactionController} from "../controllers/transactionController";

const router = express.Router();
router.use(currentUser)
router.use(requireAuth);

router.get('/banking/transactions', TransactionController.getTransaction);

router.post('banking/credit', [body('amount').not().isFloat({gt: 0}).withMessage('Amount must be greater than zero')]);

router.post('banking/debit', [body('amount').not().isFloat({gt: 0}).withMessage('Amount must be greater than zero')]);


export {router as TransactionRouter};