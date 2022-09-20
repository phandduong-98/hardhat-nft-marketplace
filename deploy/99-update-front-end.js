const { ethers, network } = require("hardhat");
const fs = require("fs");
const frontEndContractFile =
  "../nextjs-nft-marketplace-moralis/constants/networkMapping.json";
const frontEndAbiFile = "../nextjs-nft-marketplace-moralis/constants/";

module.exports = async () => {
  if (process.env.UPDATE_FRONT_END) {
    console.log("UPDATE_FRONT_END . . .");
    await updateContractAddresses();
    await updateAbi();
  }
};

const updateAbi = async () => {
  const nftMarketplace = await ethers.getContract("NftMarketplace");
  fs.writeFileSync(
    `${frontEndAbiFile}NftMarketplace.json`,
    nftMarketplace.interface.format(ethers.utils.FormatTypes.json)
  );
  const basicNft = await ethers.getContract("BasicNFT");
  fs.writeFileSync(
    `${frontEndAbiFile}BasicNft.json`,
    basicNft.interface.format(ethers.utils.FormatTypes.json)
  );
};

const updateContractAddresses = async () => {
  const nftMartketplace = await ethers.getContract("NftMarketplace");
  const chainId = network.config.chainId.toString();
  const contractAddresses = JSON.parse(
    fs.readFileSync(frontEndContractFile, "utf8")
  );
  if (chainId in contractAddresses) {
    if (
      !contractAddresses[chainId]["NftMarketplace"].includes(
        nftMartketplace.address
      )
    ) {
      contractAddresses[chainId]["NftMarketplace"].push(
        nftMartketplace.address
      );
    }
  } else {
    contractAddresses[chainId] = { NftMarketplace: [nftMartketplace.address] };
  }
  fs.writeFileSync(frontEndContractFile, JSON.stringify(contractAddresses));
};

module.exports.tags = ["all", "frontend"];
