import * as express from 'express';

import { nftaRouter } from './nfta';

export const services = express.Router();

services.use('/nfta', nftaRouter);