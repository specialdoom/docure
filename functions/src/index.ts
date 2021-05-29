import * as functions from 'firebase-functions';
import cors from "cors";
import express from "express";
import { articleRoutesConfig } from './articles/routes-config';

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
articleRoutesConfig(app);

export const docure = functions.https.onRequest(app);