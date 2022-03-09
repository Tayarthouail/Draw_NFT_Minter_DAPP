// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract SmartContract is ERC721, Ownable {
   using Counters for Counters.Counter;
   using Strings for uint256;
   Counters.Counter _tokenIds;
   // to keep track of all the tokens URIS
   mapping(uint256 => string) _tokenURIs;


   struct RenderToken {
       uint256 id;
       string uri;
   }

   constructor() ERC721("Smart Contract", "SCT") {}

   //Set token URI(internal because it is going to be called only inside another function)
   function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal {
       _tokenURIs[tokenId] = _tokenURI;
   }

   // Mint function
    function mint(address recipient, string memory uri) public returns (uint256) {
        uint256 newId = _tokenIds.current();
        _mint(recipient, newId);
        _setTokenURI(newId, uri);
        _tokenIds.increment();
        return newId;
    }

   // For OpenSea to Read the meta Data
   function tokenURI (uint256 tokenId) virtual override public view returns(string memory) {
       require(_exists(tokenId));
       string memory _tokenURI = _tokenURIs[tokenId];
       return _tokenURI;
   }

   // return all the the TOKENS
   function getAllTokens() public view returns (RenderToken[] memory) {
       // get the last tokenId
       uint256 lastestId = _tokenIds.current();
       uint256 counter = 0;
       
       //create a new array type RenderToken to keep track of the lengh
       RenderToken[] memory result = new RenderToken[](lastestId);

       for(uint256 i = 0; i < lastestId; i++) {
           if(_exists(counter)) {
            string memory uri = tokenURI(counter);
            result[counter] = RenderToken(counter, uri);
        }
        counter++;
       }
        return result;
   }

}