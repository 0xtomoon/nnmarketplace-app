import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { getRepository } from "typeorm";
import { Nfta } from "../../entity/Nfta";
config();

export const get_nfts = async function (req: Request, res: Response, next: NextFunction) {
  const owner = req.query.address ? req.query.address.toString() : ""

  const nftaRepository = getRepository(Nfta)
  if(owner != "") {
    const nfts = await nftaRepository.find({where: { owner: owner }})
    return res.status(200).json(nfts)
  }
  const nfts = await nftaRepository.find()
  return res.status(200).json(nfts)
}

export const get_my_nfts = async function (req: Request, res: Response, next: NextFunction) {
  const owner = req.query.address ? req.query.address.toString() : ""

  const nftaRepository = getRepository(Nfta)
  const nfts = await nftaRepository.find({where: { owner: owner }})
  return res.status(200).json(nfts)
}

export const get_listed_nfts = async function (req: Request, res: Response, next: NextFunction) {
  const nftaRepository = getRepository(Nfta);
  const nfts = await nftaRepository.find({where: { listed: true }});
  return res.status(200).json(nfts)
}

export const list = async function (req: Request, res: Response, next: NextFunction) {
  if(!req.body.id || !req.body.price) {
    return res.status(500)
      .json({
          msg: 'Request params are not valid.'
      })
  }

  const nftaRepo = getRepository(Nfta)
  let nft = await nftaRepo.findOne({
    where: {
      token_id: req.body.id
    }
  })
  nft.listed = true
  nft.price = req.body.price
  nftaRepo.save(nft)

  return res.status(200)
    .json(nft)
}

export const purchase = async function (req: Request, res: Response, next: NextFunction) {
  if(!req.body.id || !req.body.address) {
    return res.status(500)
      .json({
          msg: 'Request params are not valid.'
      })
  }

  const nftaRepo = getRepository(Nfta)
  let nft = await nftaRepo.findOne({
    where: {
      token_id: req.body.id
    }
  })
  nft.listed = false
  nft.price = 0
  nft.owner = req.body.address
  nftaRepo.save(nft)

  return res.status(200)
    .json(nft);
}