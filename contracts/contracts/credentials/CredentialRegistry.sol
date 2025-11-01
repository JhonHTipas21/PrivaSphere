// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title CredentialRegistry
 * @dev Registro de credenciales verificables on-chain
 */
contract CredentialRegistry is AccessControl, ReentrancyGuard {
    
    bytes32 public constant ISSUER_ROLE = keccak256("ISSUER_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    
    struct Credential {
        bytes32 credentialHash;
        address subject;
        address issuer;
        string credentialType;
        string ipfsHash;
        uint256 issuedAt;
        uint256 expiresAt;
        bool isRevoked;
        string revocationReason;
    }
    
    // Mapping de credentialId a Credential
    mapping(bytes32 => Credential) public credentials;
    
    // Mapping de subject a sus credentialIds
    mapping(address => bytes32[]) public subjectCredentials;
    
    // Mapping de issuer a credenciales emitidas
    mapping(address => bytes32[]) public issuerCredentials;
    
    // Array de todos los credentialIds
    bytes32[] public allCredentials;
    
    // Eventos
    event CredentialIssued(
        bytes32 indexed credentialId,
        address indexed subject,
        address indexed issuer,
        string credentialType,
        uint256 timestamp
    );
    
    event CredentialRevoked(
        bytes32 indexed credentialId,
        address indexed issuer,
        string reason,
        uint256 timestamp
    );
    
    event CredentialVerified(
        bytes32 indexed credentialId,
        address indexed verifier,
        bool isValid,
        uint256 timestamp
    );
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ISSUER_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
    }
    
    /**
     * @dev Emitir una nueva credencial
     */
    function issueCredential(
        address _subject,
        string memory _credentialType,
        string memory _ipfsHash,
        uint256 _expiresAt
    ) external onlyRole(ISSUER_ROLE) nonReentrant returns (bytes32) {
        require(_subject != address(0), "Invalid subject address");
        require(bytes(_credentialType).length > 0, "Credential type required");
        require(bytes(_ipfsHash).length > 0, "IPFS hash required");
        require(_expiresAt > block.timestamp, "Expiration must be in future");
        
        // Generar ID único de credencial
        bytes32 credentialId = keccak256(
            abi.encodePacked(
                _subject,
                msg.sender,
                _credentialType,
                _ipfsHash,
                block.timestamp
            )
        );
        
        require(credentials[credentialId].issuedAt == 0, "Credential already exists");
        
        // Crear credencial
        Credential memory newCredential = Credential({
            credentialHash: credentialId,
            subject: _subject,
            issuer: msg.sender,
            credentialType: _credentialType,
            ipfsHash: _ipfsHash,
            issuedAt: block.timestamp,
            expiresAt: _expiresAt,
            isRevoked: false,
            revocationReason: ""
        });
        
        credentials[credentialId] = newCredential;
        subjectCredentials[_subject].push(credentialId);
        issuerCredentials[msg.sender].push(credentialId);
        allCredentials.push(credentialId);
        
        emit CredentialIssued(
            credentialId,
            _subject,
            msg.sender,
            _credentialType,
            block.timestamp
        );
        
        return credentialId;
    }
    
    /**
     * @dev Revocar una credencial
     */
    function revokeCredential(
        bytes32 _credentialId,
        string memory _reason
    ) external nonReentrant {
        Credential storage credential = credentials[_credentialId];
        
        require(credential.issuedAt > 0, "Credential does not exist");
        require(!credential.isRevoked, "Credential already revoked");
        require(
            msg.sender == credential.issuer || hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Only issuer or admin can revoke"
        );
        
        credential.isRevoked = true;
        credential.revocationReason = _reason;
        
        emit CredentialRevoked(_credentialId, msg.sender, _reason, block.timestamp);
    }
    
    /**
     * @dev Verificar si una credencial es válida
     */
    function verifyCredential(bytes32 _credentialId) 
        external 
        onlyRole(VERIFIER_ROLE) 
        returns (bool) 
    {
        Credential memory credential = credentials[_credentialId];
        
        require(credential.issuedAt > 0, "Credential does not exist");
        
        bool isValid = !credential.isRevoked && 
                       credential.expiresAt > block.timestamp;
        
        emit CredentialVerified(_credentialId, msg.sender, isValid, block.timestamp);
        
        return isValid;
    }
    
    /**
     * @dev Obtener credencial por ID
     */
    function getCredential(bytes32 _credentialId) external view returns (
        address subject,
        address issuer,
        string memory credentialType,
        string memory ipfsHash,
        uint256 issuedAt,
        uint256 expiresAt,
        bool isRevoked,
        string memory revocationReason
    ) {
        Credential memory credential = credentials[_credentialId];
        require(credential.issuedAt > 0, "Credential does not exist");
        
        return (
            credential.subject,
            credential.issuer,
            credential.credentialType,
            credential.ipfsHash,
            credential.issuedAt,
            credential.expiresAt,
            credential.isRevoked,
            credential.revocationReason
        );
    }
    
    /**
     * @dev Obtener credenciales de un sujeto
     */
    function getSubjectCredentials(address _subject) 
        external 
        view 
        returns (bytes32[] memory) 
    {
        return subjectCredentials[_subject];
    }
    
    /**
     * @dev Obtener credenciales emitidas por un issuer
     */
    function getIssuerCredentials(address _issuer) 
        external 
        view 
        returns (bytes32[] memory) 
    {
        return issuerCredentials[_issuer];
    }
    
    /**
     * @dev Obtener total de credenciales
     */
    function getTotalCredentials() external view returns (uint256) {
        return allCredentials.length;
    }
    
    /**
     * @dev Verificar validez de credencial (view)
     */
    function isCredentialValid(bytes32 _credentialId) external view returns (bool) {
        Credential memory credential = credentials[_credentialId];
        
        if (credential.issuedAt == 0) return false;
        if (credential.isRevoked) return false;
        if (credential.expiresAt <= block.timestamp) return false;
        
        return true;
    }
}
