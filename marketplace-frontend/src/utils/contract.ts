import { ethers } from 'ethers';
import { marketplaceAbi, mkpAbi, nftaAbi } from '@/contracts';
import { MARKETPLACE_ADDRESS, MKP_ADDRESS, NFTA_ADDRESS } from "./address";

// Create the Marketplace contract instance
export const getMarketplaceProviderContract = (provider: any) => {
  const marketplaceProviderContract = new ethers.Contract(MARKETPLACE_ADDRESS, marketplaceAbi, provider);
  return marketplaceProviderContract;
}

// Create the MKP contract instance
export const getMkpProviderContract = (provider: any) => {
  const mkpProviderContract = new ethers.Contract(MKP_ADDRESS, mkpAbi, provider);
  return mkpProviderContract;
}

// Create the MKP contract instance
export const getNftaProviderContract = (provider: any) => {
  const nftaProviderContract = new ethers.Contract(NFTA_ADDRESS, nftaAbi, provider);
  return nftaProviderContract;
}