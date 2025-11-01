import crypto from 'crypto';
import { ethers } from 'ethers';

export const generateKeyPair = () => {
  const wallet = ethers.Wallet.createRandom();
  
  return {
    publicKey: wallet.publicKey,
    privateKey: wallet.privateKey,
    address: wallet.address
  };
};

export const hashData = (data) => {
  return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
};

export const signMessage = async (message, privateKey) => {
  const wallet = new ethers.Wallet(privateKey);
  return await wallet.signMessage(message);
};

export const verifyMessage = (message, signature, address) => {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch (error) {
    return false;
  }
};

export const generateChallenge = () => {
  return crypto.randomBytes(32).toString('hex');
};
