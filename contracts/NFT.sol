// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private tokenIds;

    constructor() ERC721("SCS Default Collection", "SCS") {}

    function _mintToken(address _account, string memory _tokenURI) public returns (uint256) {
        tokenIds.increment();
        uint256 newTokenId = tokenIds.current();
        _mint(_account, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        return newTokenId;
    }
}
