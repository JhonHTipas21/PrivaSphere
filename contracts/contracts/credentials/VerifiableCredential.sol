// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title VerifiableCredential
 * @dev Credenciales verificables como NFTs (ERC-721)
 */
contract VerifiableCredential is ERC721, ERC721URIStorage, Ownable {
    
    uint256 private _tokenIdCounter;
    
    struct CredentialMetadata {
        string credentialType;
        address issuer;
        uint256 issuedAt;
        uint256 expiresAt;
        bool isRevoked;
    }
    
    mapping(uint256 => CredentialMetadata) public credentialMetadata;
    
    event CredentialMinted(
        uint256 indexed tokenId,
        address indexed recipient,
        string credentialType,
        address issuer
    );
    
    event CredentialRevoked(uint256 indexed tokenId);
    
    constructor() ERC721("VeritasID Credential", "VID") Ownable(msg.sender) {}
    
    /**
     * @dev Mintear una nueva credencial
     */
    function mintCredential(
        address _recipient,
        string memory _tokenURI,
        string memory _credentialType,
        uint256 _expiresAt
    ) external onlyOwner returns (uint256) {
        require(_recipient != address(0), "Invalid recipient");
        require(_expiresAt > block.timestamp, "Invalid expiration");
        
        _tokenIdCounter++;
        uint256 tokenId = _tokenIdCounter;
        
        _safeMint(_recipient, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        
        credentialMetadata[tokenId] = CredentialMetadata({
            credentialType: _credentialType,
            issuer: msg.sender,
            issuedAt: block.timestamp,
            expiresAt: _expiresAt,
            isRevoked: false
        });
        
        emit CredentialMinted(tokenId, _recipient, _credentialType, msg.sender);
        
        return tokenId;
    }
    
    /**
     * @dev Revocar credencial
     */
    function revokeCredential(uint256 _tokenId) external onlyOwner {
        require(ownerOf(_tokenId) != address(0), "Credential does not exist");
        require(!credentialMetadata[_tokenId].isRevoked, "Already revoked");
        
        credentialMetadata[_tokenId].isRevoked = true;
        
        emit CredentialRevoked(_tokenId);
    }
    
    /**
     * @dev Verificar si credencial es válida
     */
    function isCredentialValid(uint256 _tokenId) external view returns (bool) {
        if (ownerOf(_tokenId) == address(0)) return false;
        
        CredentialMetadata memory metadata = credentialMetadata[_tokenId];
        
        if (metadata.isRevoked) return false;
        if (metadata.expiresAt <= block.timestamp) return false;
        
        return true;
    }
    
    /**
     * @dev Override necesarios para ERC721URIStorage
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
