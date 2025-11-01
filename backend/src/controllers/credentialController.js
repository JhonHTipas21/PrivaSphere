import { 
    issueCredential, 
    getCredentialsByDID, 
    revokeCredential 
  } from '../services/ceramicService.js';
  
  export const issueNewCredential = async (req, res, next) => {
    try {
      const { 
        subjectDID, 
        credentialType, 
        claims, 
        issuerDID 
      } = req.body;
  
      if (!subjectDID || !credentialType || !claims || !issuerDID) {
        return res.status(400).json({ 
          error: 'Missing required fields' 
        });
      }
  
      const credential = await issueCredential({
        subjectDID,
        credentialType,
        claims,
        issuerDID
      });
  
      res.status(201).json({
        success: true,
        credential,
        message: 'Credential issued successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const getUserCredentials = async (req, res, next) => {
    try {
      const { did } = req.params;
  
      if (!did) {
        return res.status(400).json({ error: 'DID parameter is required' });
      }
  
      const credentials = await getCredentialsByDID(did);
  
      res.json({
        success: true,
        did,
        credentials,
        count: credentials.length
      });
    } catch (error) {
      next(error);
    }
  };
  
  export const revokeUserCredential = async (req, res, next) => {
    try {
      const { credentialId } = req.params;
      const { reason } = req.body;
  
      if (!credentialId) {
        return res.status(400).json({ 
          error: 'Credential ID is required' 
        });
      }
  
      await revokeCredential(credentialId, reason);
  
      res.json({
        success: true,
        credentialId,
        message: 'Credential revoked successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  