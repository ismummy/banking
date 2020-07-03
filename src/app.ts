import express from 'express'
import 'express-async-errors';
import {json} from 'body-parser'
import cookieSession from "cookie-session";

import {AuthRouter} from "./routes/authRoutes";
import {TransactionRouter} from "./routes/transactionRoutes";
import {errorHandler, NotFoundError} from "@jhaki/common";

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(AuthRouter);
app.use(TransactionRouter);

app.all('*', async () => {
    throw new NotFoundError()
});

app.use(errorHandler);

export {app};