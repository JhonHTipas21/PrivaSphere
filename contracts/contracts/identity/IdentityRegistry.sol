// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title IdentityRegistry
 * @dev Registro descentralizado de identidades (DIDs)
 */
contract IdentityRegistry is Ownable, ReentrancyGuard {
    
    struct Identity {
        address owner;
        string did;
        string documentHash; // IPFS hash del documento DID
        uint256 createdAt;
        uint256 updatedAt;
        bool isActive;
    }
    
    // Mapping de address a Identity
    mapping(address => Identity) public identities;
    
    // Mapping de DID a address
    mapping(string => address) public didToAddress;
    
    // Array de todas las direcciones con identidad
    address[] public identityOwners;
    
    // Eventos
    event IdentityCreated(
        address indexed owner,
        string did,
        string documentHash,
        uint256 timestamp
    );
    
    event IdentityUpdated(
        address indexed owner,
        string did,
        string newDocumentHash,
        uint256 timestamp
    );
    
    event IdentityRevoked(
        address indexed owner,
        string did,
        uint256 timestamp
    );
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Crear una nueva identidad
     */
    function createIdentity(
        string memory _did,
        string memory _documentHash
    ) external nonReentrant {
        require(identities[msg.sender].createdAt == 0, "Identity already exists");
        require(didToAddress[_did] == address(0), "DID already registered");
        require(bytes(_did).length > 0, "DID cannot be empty");
        require(bytes(_documentHash).length > 0, "Document hash cannot be empty");
        
        Identity memory newIdentity = Identity({
            owner: msg.sender,
            did: _did,
            documentHash: _documentHash,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            isActive: true
        });
        
        identities[msg.sender] = newIdentity;
        didToAddress[_did] = msg.sender;
        identityOwners.push(msg.sender);
        
        emit IdentityCreated(msg.sender, _did, _documentHash, block.timestamp);
    }
    
    /**
     * @dev Actualizar documento de identidad
     */
    function updateIdentity(string memory _newDocumentHash) external nonReentrant {
        require(identities[msg.sender].createdAt > 0, "Identity does not exist");
        require(identities[msg.sender].isActive, "Identity is not active");
        require(bytes(_newDocumentHash).length > 0, "Document hash cannot be empty");
        
        identities[msg.sender].documentHash = _newDocumentHash;
        identities[msg.sender].updatedAt = block.timestamp;
        
        emit IdentityUpdated(
            msg.sender,
            identities[msg.sender].did,
            _newDocumentHash,
            block.timestamp
        );
    }
    
    /**
     * @dev Revocar identidad (solo el propietario)
     */
    function revokeIdentity() external nonReentrant {
        require(identities[msg.sender].createdAt > 0, "Identity does not exist");
        require(identities[msg.sender].isActive, "Identity already revoked");
        
        identities[msg.sender].isActive = false;
        identities[msg.sender].updatedAt = block.timestamp;
        
        emit IdentityRevoked(
            msg.sender,
            identities[msg.sender].did,
            block.timestamp
        );
    }
    
    /**
     * @dev Obtener identidad por address
     */
    function getIdentity(address _owner) external view returns (
        string memory did,
        string memory documentHash,
        uint256 createdAt,
        uint256 updatedAt,
        bool isActive
    ) {
        Identity memory identity = identities[_owner];
        require(identity.createdAt > 0, "Identity does not exist");
        
        return (
            identity.did,
            identity.documentHash,
            identity.createdAt,
            identity.updatedAt,
            identity.isActive
        );
    }
    
    /**
     * @dev Obtener address por DID
     */
    function getAddressByDID(string memory _did) external view returns (address) {
        address owner = didToAddress[_did];
        require(owner != address(0), "DID not found");
        return owner;
    }
    
    /**
     * @dev Verificar si una identidad existe y está activa
     */
    function isIdentityActive(address _owner) external view returns (bool) {
        return identities[_owner].isActive;
    }
    
    /**
     * @dev Obtener número total de identidades
     */
    function getTotalIdentities() external view returns (uint256) {
        return identityOwners.length;
    }
}
