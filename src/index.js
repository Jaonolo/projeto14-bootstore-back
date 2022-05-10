import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
app.use(cors(), express.json());

import authorizationRouter from './routers/authorization.js';
import transactionsRouter from './routers/transactions.js';

app.use(authorizationRouter);
app.use(transactionsRouter);

dotenv.config();
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));