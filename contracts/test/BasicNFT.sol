// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BasicNFT is ERC721 {
    string public constant TOKEN_URI =
        "ipfs://QmSkqzYc32faVtrU4bumVLGVFyjFjkLrZSBTYietymcJkz?filename=nftAttributes.json";
    uint256 private s_tokenCounter;

    constructor() ERC721("Nekotin", "NEKO") {
        s_tokenCounter = 0;
    }

    function mintNft() public returns (uint256) {
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter += 1;
        return s_tokenCounter;
    }

    function getTokenURI() public pure returns(string memory){
        return TOKEN_URI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return TOKEN_URI;
    }

    // getters
    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
