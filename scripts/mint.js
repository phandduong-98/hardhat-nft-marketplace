const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");
const mintAndList = async () => {
  const basicNft = await ethers.getContract("BasicNFT");
  console.log("minting...");
  const mintTx = await basicNft.mintNft();
  const mintTxReceipt = await mintTx.wait(1);
  const tokenId = mintTxReceipt.events[0].args.tokenId;
  console.log(`token id ${tokenId}`);
  console.log(`NFT addresS: ${basicNft.address}`);
  if (network.config.chainId == "31337") {
    await moveBlocks(2, (sleepAmount = 1000));
  }
};

mintAndList()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
