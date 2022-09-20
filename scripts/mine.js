const { ethers, network } = require("hardhat");
const { moveBlocks } = require("../utils/move-blocks");
const mine = async () => {
  if (network.config.chainId == "31337") {
    await moveBlocks(2, (sleepAmount = 1000));
  }
};

mine()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
