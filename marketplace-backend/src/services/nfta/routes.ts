import * as express from 'express';
import * as controller from './controller';

export const nftaRouter = express.Router();

nftaRouter.route('/').get(controller.get_nfts);
nftaRouter.route('/my_collection').get(controller.get_my_nfts);
nftaRouter.route('/list').get(controller.get_listed_nfts);
nftaRouter.route('/list').post(controller.list);
nftaRouter.route('/purchase').post(controller.purchase);