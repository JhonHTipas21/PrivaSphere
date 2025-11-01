import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const RPC_URL = process.env.POLYGON_RPC_URL || 'https://rpc-mumbai.maticvigil.com';
const CHAIN_ID = parseInt(process.env.POLYGON_CHAIN_ID || '80001');

export const getProvider = () => {
  return new ethers.JsonRpcProvider(RPC_URL);
};

export const getSigner = () => {
  const provider = getProvider();
  const privateKey = process.env.ADMIN_PRIVATE_KEY;
  
  if (!privateKey) {
    throw new Error('ADMIN_PRIVATE_KEY not set in environment variables');
  }
  
  return new ethers.Wallet(privateKey, provider);
};

export const getNetworkInfo = async () => {
  const provider = getProvider();
  const network = await provider.getNetwork();
  
  return {
    chainId: Number(network.chainId),
    name: network.name,
    rpcUrl: RPC_URL
  };
};

export { CHAIN_ID, RPC_URL };
