import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const auth = async function (req: Request, res: Response, next: NextFunction) {
  let publicAddress = req.body.public_address;

  let signature = req.body.signature;
  if (!signature) {
    return res.status(400)
      .send({
        error: 'Your signature empty.'
      });
  }

  let accessToken = jwt.sign(
    {
      payload: {
        publicAddress
      }
    },
    process.env.JWT_SECRET,
    {
      algorithm: 'HS256'
    }
  );

  return res.json({
    accessToken
  });
}