import { createDID, resolveDID, updateDIDDocument } from '../services/didService.js';
import { getCeramicInstance } from '../config/ceramic.js';

export const createIdentity = async (req, res, next) => {
  try {
    const { address, publicKey } = req.body;

    if (!address || !publicKey) {
      return res.status(400).json({ 
        error: 'Address and publicKey are required' 
      });
    }

    const did = await createDID(address, publicKey);

    res.status(201).json({
      success: true,
      did: did.id,
      document: did.document,
      message: 'DID created successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getIdentity = async (req, res, next) => {
  try {
    const { did } = req.params;

    if (!did) {
      return res.status(400).json({ error: 'DID parameter is required' });
    }

    const didDocument = await resolveDID(did);

    res.json({
      success: true,
      did,
      document: didDocument
    });
  } catch (error) {
    next(error);
  }
};

export const updateIdentity = async (req, res, next) => {
  try {
    const { did } = req.params;
    const { updates } = req.body;

    if (!did || !updates) {
      return res.status(400).json({ 
        error: 'DID and updates are required' 
      });
    }

    const updatedDocument = await updateDIDDocument(did, updates);

    res.json({
      success: true,
      did,
      document: updatedDocument,
      message: 'DID updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
